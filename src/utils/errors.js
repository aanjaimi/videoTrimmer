"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isZodError = void 0;
const zod_1 = require("zod");
const isZodError = (error) => error instanceof zod_1.ZodError;
exports.isZodError = isZodError;
