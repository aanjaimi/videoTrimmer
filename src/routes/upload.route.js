"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadRouter = void 0;
const multer_1 = require("../utils/multer");
const upload_service_1 = require("../services/upload.service");
const uploadRouter = (fastify, _, done) => {
    fastify.post("/upload", {
        preHandler: multer_1.videoUploader.single("video"),
    }, upload_service_1.uploadVideo);
    done();
};
exports.uploadRouter = uploadRouter;
