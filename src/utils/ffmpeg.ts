import ffmpeg from "ffmpeg";

export type Video = Awaited<InstanceType<typeof ffmpeg>>;

export default (filePath: string) => new ffmpeg(filePath);

export const videoResize = (
  video: Video,
  width: number,
  height: number
) => {
  const size = `${width}x${height}`;
  return video.setVideoSize(size, true, true);
};

export const videoSplit = (
  video: Video,
  start: number,
  end: number,
) => {
  video = video.setVideoStartTime(start).setVideoDuration(end - start);
  return video;
};
