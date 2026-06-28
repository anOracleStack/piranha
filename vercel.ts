import { routes, type VercelConfig } from "@vercel/config/v1";

export const config: VercelConfig = {
  framework: "nextjs",
  buildCommand: "npm run build",
  installCommand: "npm install",
  headers: [
    routes.cacheControl("/images/(.*)", {
      public: true,
      maxAge: "30 days",
      staleWhileRevalidate: "1 day",
    }),
    routes.cacheControl("/video/(.*)", {
      public: true,
      maxAge: "30 days",
      immutable: true,
    }),
  ],
};
