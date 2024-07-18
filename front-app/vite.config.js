import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

const envKeys = ["API_URL"];

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const processEnv = {};
  envKeys.forEach((key) => (processEnv[key] = env[key]));
  return {
    define: {
      "process.env": processEnv,
    },
    plugins: [react()],
  };
});
