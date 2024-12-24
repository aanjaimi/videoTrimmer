import { build } from "./app/app";
import dotenv from "dotenv";

dotenv.config();

const app = build();

app.listen(
  {
    port: parseInt(process.env.PORT || "8080"),
    host: '0.0.0.0',
  },
  (error, addr) => {
    if (error) {
      console.error(error);
      process.exit(1);
    }
    console.log("Running at", addr);
  }
);
