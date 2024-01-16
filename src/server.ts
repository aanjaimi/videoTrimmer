import { build } from "./app";
import dotenv from "dotenv";

dotenv.config();

const app = build();

app.listen(
  {
    port: parseInt(process.env.PORT || "4000"),
  },
  (error, addr) => {
    if (error) {
      console.error(error);
      process.exit(1);
    }
    console.log("Running at", addr);
  }
);
