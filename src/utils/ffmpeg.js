"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.videoSplit = exports.videoResize = void 0;
const ffmpeg_1 = __importDefault(require("ffmpeg"));
exports.default = (filePath) => new ffmpeg_1.default(filePath);
const videoResize = (video, width, height) => {
    const size = `${width}x${height}`;
    return video.setVideoSize(size, true, true);
};
exports.videoResize = videoResize;
const videoSplit = (video, start, end) => {
    video = video.setVideoStartTime(start).setVideoDuration(end - start);
    return video;
};
exports.videoSplit = videoSplit;
