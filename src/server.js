"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app/app");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, app_1.build)();
app.listen({
    port: parseInt(process.env.PORT || "4000"),
}, (error, addr) => {
    if (error) {
        console.error(error);
        process.exit(1);
    }
    console.log("Running at", addr);
});
