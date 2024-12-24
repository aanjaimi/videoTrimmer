import { FastifyReply, FastifyRequest, RouteHandlerMethod } from "fastify";
import ffmpeg, { Video, videoResize, videoSplit } from "../utils/ffmpeg";
import path from "path";
import { z } from "zod";

const gen = (filepath: string) => {
  return path.join(__dirname, "../", "uploads", filepath);
};

const transformToNumber = (value: string) => +value;

const validCodecValues = ["h264", "vp9", "av1"];
const validAudioCodecValues = ["aac", "opus"];

const isPositiveNumber = (value: number) => value > 0;

const uploadVideoSchema = z.object({
  width: z.optional(z.string().transform(transformToNumber).refine(isPositiveNumber, { message: "Invalid width" })),
  height: z.optional(z.string().transform(transformToNumber).refine(isPositiveNumber, { message: "Invalid height" })),
  start: z.optional(z.string().transform(transformToNumber)),
  end: z.optional(z.string().transform(transformToNumber)),
  videoCodec: z.optional(z.string().refine(value => validCodecValues.includes(value), { message: "Invalid video codec" })),
  audioCodec: z.optional(z.string().refine(value => validAudioCodecValues.includes(value), { message: "Invalid audio codec" })),
  video: z
    .string({
      invalid_type_error: "file is missing",
      required_error: "file is missing",
    })
    .transform(async (path) => await ffmpeg(path)),
})
  .refine(
    ({ width, height, start, end }) => {
      const hasSize = width !== undefined && height !== undefined;
      const hasTrim = start !== undefined && end !== undefined;
      return hasSize || hasTrim;
    },
    {
      message: "Either 'width' and 'height' or 'start' and 'end' fields must be present",
    }
  )
  .refine(
    ({ end, start }) => {
      if (start !== undefined && end !== undefined) return end > start;
      return true;
    },
    {
      message: "Invalid start or end",
    }
  )
  .refine(
    ({ video, start, end }) => {
      const secs = video.metadata.duration?.seconds ?? 0;
      if (start !== undefined && end !== undefined) return start < secs && end <= secs;
      return true;
    },
    { message: "Start or end bigger than secs of video" }
  );

  export const uploadVideo: RouteHandlerMethod = async (req, reply) => {
    const { start, end, width, height, video, videoCodec, audioCodec } =
      await uploadVideoSchema.parseAsync({
        ...(req.body as any),
        video: req.file?.path,
      });
  
    let newVideo = video;
    const filename = gen(req.file.filename + ".mp4");
  
    if (width !== undefined && height !== undefined) {
      newVideo = videoResize(video, width, height);
    }
  
    if (start !== undefined && end !== undefined) {
      newVideo = videoSplit(newVideo, start, end!);
    }
  
    const videoMetadata = video.metadata as any;
  
    if (videoCodec && videoMetadata.video.codec === videoCodec) {
      newVideo = video.setVideoCodec(videoCodec);
    }
  
    if (audioCodec && videoMetadata.audio.codec === audioCodec) {
      newVideo = video.setAudioCodec(audioCodec);
    }
  
    const newfile = await newVideo.save(filename);
    reply.status(200).send({ message: "success", newfile });
  };