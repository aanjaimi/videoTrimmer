"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.build = void 0;
const fastify_1 = __importDefault(require("fastify"));
const upload_route_1 = require("../routes/upload.route");
const multer_1 = require("../utils/multer");
const errors_1 = require("../utils/errors");
const build = (opts = {
    logger: true,
}) => {
    const app = (0, fastify_1.default)(opts);
    app.register(multer_1.multerParser);
    app.register(upload_route_1.uploadRouter);
    app.setErrorHandler((error, _req, reply) => {
        if ((0, errors_1.isZodError)(error)) {
            reply.status(400).send({ message: error.message, statusCode: 400 });
        }
        else if ((0, multer_1.isMulterError)(error)) {
            reply.status(415).send({ message: error.message, statusCode: 415 });
        }
        else
            reply.status(500).send({ message: "Internal Server Error", statusCode: 500 });
    });
    return app;
};
exports.build = build;
