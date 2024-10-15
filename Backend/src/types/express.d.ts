// src/types/express.d.ts
import { Request } from "express";

// Extend the Express Request interface to include a user property
declare module "express-serve-static-core" {
  interface Request {
    user?: any; // or you can specify a specific type if you know what it should be
  }
}