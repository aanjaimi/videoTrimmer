"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadVideo = void 0;
const ffmpeg_1 = __importStar(require("../utils/ffmpeg"));
const path_1 = __importDefault(require("path"));
const zod_1 = require("zod");
const gen = (filepath) => {
    return path_1.default.join(__dirname, "../", "uploads", filepath);
};
const transformToNumber = (value) => +value;
const validCodecValues = ["h264", "vp9", "av1"];
const validAudioCodecValues = ["aac", "opus"];
const isPositiveNumber = (value) => value > 0;
const uploadVideoSchema = zod_1.z.object({
    width: zod_1.z.optional(zod_1.z.string().transform(transformToNumber).refine(isPositiveNumber, { message: "Invalid width" })),
    height: zod_1.z.optional(zod_1.z.string().transform(transformToNumber).refine(isPositiveNumber, { message: "Invalid height" })),
    start: zod_1.z.optional(zod_1.z.string().transform(transformToNumber)),
    end: zod_1.z.optional(zod_1.z.string().transform(transformToNumber)),
    videoCodec: zod_1.z.optional(zod_1.z.string().refine(value => validCodecValues.includes(value), { message: "Invalid video codec" })),
    audioCodec: zod_1.z.optional(zod_1.z.string().refine(value => validAudioCodecValues.includes(value), { message: "Invalid audio codec" })),
    video: zod_1.z
        .string({
        invalid_type_error: "file is missing",
        required_error: "file is missing",
    })
        .transform((path) => __awaiter(void 0, void 0, void 0, function* () { return yield (0, ffmpeg_1.default)(path); })),
})
    .refine(({ width, height, start, end }) => {
    const hasSize = width !== undefined && height !== undefined;
    const hasTrim = start !== undefined && end !== undefined;
    return hasSize || hasTrim;
}, {
    message: "Either 'width' and 'height' or 'start' and 'end' fields must be present",
})
    .refine(({ end, start }) => {
    if (start !== undefined && end !== undefined)
        return end > start;
    return true;
}, {
    message: "Invalid start or end",
})
    .refine(({ video, start, end }) => {
    var _a, _b;
    const secs = (_b = (_a = video.metadata.duration) === null || _a === void 0 ? void 0 : _a.seconds) !== null && _b !== void 0 ? _b : 0;
    if (start !== undefined && end !== undefined)
        return start < secs && end <= secs;
    return true;
}, { message: "Start or end bigger than secs of video" });
const uploadVideo = (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { start, end, width, height, video, videoCodec, audioCodec } = yield uploadVideoSchema.parseAsync(Object.assign(Object.assign({}, req.body), { video: (_a = req.file) === null || _a === void 0 ? void 0 : _a.path }));
    let newVideo = video;
    const filename = gen(req.file.filename + ".mp4");
    if (width !== undefined && height !== undefined) {
        newVideo = (0, ffmpeg_1.videoResize)(video, width, height);
    }
    if (start !== undefined && end !== undefined) {
        newVideo = (0, ffmpeg_1.videoSplit)(newVideo, start, end);
    }
    const videoMetadata = video.metadata;
    if (videoCodec && videoMetadata.video.codec === videoCodec) {
        newVideo = video.setVideoCodec(videoCodec);
    }
    if (audioCodec && videoMetadata.audio.codec === audioCodec) {
        newVideo = video.setAudioCodec(audioCodec);
    }
    const newfile = yield newVideo.save(filename);
    reply.status(200).send({ message: "success", newfile });
});
exports.uploadVideo = uploadVideo;
