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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.videoUploader = exports.isMulterError = exports.multerParser = void 0;
const fastify_multer_1 = __importStar(require("fastify-multer"));
const multer_error_1 = __importDefault(require("fastify-multer/lib/lib/multer-error"));
exports.multerParser = fastify_multer_1.contentParser;
const isMulterError = (error) => error instanceof multer_error_1.default;
exports.isMulterError = isMulterError;
exports.videoUploader = (0, fastify_multer_1.default)({
    storage: (0, fastify_multer_1.diskStorage)({
        destination: "/tmp/videos",
    }),
    fileFilter(req, file, callback) {
        if (file.mimetype.startsWith("video/")) {
            callback(null, true);
        }
        else {
            callback(new multer_error_1.default('LIMIT_UNEXPECTED_FILE', 'Invalid file type'), false);
        }
    },
});