import type { Express } from "express";
import { createServer, type Server } from "http";

export async function registerRoutes(app: Express): Promise<Server> {
  // This application is client-side only per SRS requirements
  // No API routes needed - all data is stored in browser localStorage
  // Server only serves static frontend assets via Vite

  const httpServer = createServer(app);

  return httpServer;
}
