import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  // Enable Nitro only on Vercel
  nitro: process.env.VERCEL ? true : false,

  tanstackStart: {
    server: {
      entry: "server",
    },
  },
});
