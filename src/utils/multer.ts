import multer, { diskStorage, contentParser } from "fastify-multer";
import MulterError from "fastify-multer/lib/lib/multer-error";

export const multerParser = contentParser;

export const isMulterError = (error: unknown): error is MulterError =>
  error instanceof MulterError;

export const videoUploader = multer({
  storage: diskStorage({
    destination: "/tmp/videos",
  }),
  fileFilter(req, file, callback) {
    if (file.mimetype.startsWith("video/")) {
      callback(null, true);
    } else {
      callback(new MulterError('LIMIT_UNEXPECTED_FILE', 'Invalid file type'), false);
    }
  },
});