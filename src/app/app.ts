import fastify, { FastifyBaseLogger, FastifyHttpOptions } from "fastify";
import { Server } from "http";
import { uploadRouter } from "../routes/upload.route";
import { isMulterError, multerParser } from "../utils/multer";
import { isZodError } from "../utils/errors";
import { healthRouter } from "../routes/health";

export const build = (
  opts: FastifyHttpOptions<Server, FastifyBaseLogger> = {
    logger: true,
  }
) => {
  const app = fastify(opts);
  app.register(multerParser);
  app.register(uploadRouter);
  app.register(healthRouter);
  app.setErrorHandler((error, _req, reply) => {
    if (isZodError(error)) {
      reply.status(400).send({ message: error.message, statusCode: 400 });
    }
    else if (isMulterError(error)) {
      reply.status(415).send({ message: error.message, statusCode: 415 });
    }
    else
      reply.status(500).send({ message: "Internal Server Error", statusCode: 500 });
  });
  return app;
};
