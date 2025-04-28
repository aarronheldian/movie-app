export const HOST_URL =
  (process.env.NEXT_PUBLIC_HOST_URL as string) || "http://localhost:3000";
export const TMDB_BASE_API_URL = process.env.TMDB_BASE_API_URL as string;
export const TMDB_API_READ_ACCESS_TOKEN = process.env
  .TMDB_API_READ_ACCESS_TOKEN as string;
export const TMDB_API_KEY = process.env.TMDB_API_KEY as string;
export const FIREBASE_API_KEY = process.env
  .NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY as string;
export const FIREBASE_AUTH_DOMAIN = process.env
  .NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN as string;
export const FIREBASE_PROJECT_ID = process.env
  .NEXT_PUBLIC_FIREBASE_PROJECT_ID as string;
