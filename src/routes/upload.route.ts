import { FastifyPluginCallback } from "fastify";
import { videoUploader } from "../utils/multer";
import { uploadVideo } from "../services/upload.service";

export const uploadRouter: FastifyPluginCallback = (fastify, _, done) => {
  fastify.post(
    "/upload",
    {
      preHandler: videoUploader.single("video"),
    },
    uploadVideo
  );

  done();
};
