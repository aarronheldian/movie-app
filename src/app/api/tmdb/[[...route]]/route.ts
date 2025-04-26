import { NextRequest, NextResponse } from "next/server";
import axios, { isAxiosError } from "axios";
import {
  TMDB_API_READ_ACCESS_TOKEN,
  TMDB_BASE_API_URL,
} from "@/constants/config";

async function handler(
  req: NextRequest,
  { params }: { params: Promise<{ route?: string[] }> }
) {
  try {
    const { route } = await params;
    const routePath = route?.length ? `/${route.join("/")}` : "";
    if (!routePath) {
      return NextResponse.json(
        { error: true, message: "Route not found" },
        { status: 404 }
      );
    }

    // Prepare clean headers
    const headers: Record<string, string> = {
      Authorization: `Bearer ${TMDB_API_READ_ACCESS_TOKEN}`,
      Accept: "application/json",
    };

    const url = `${TMDB_BASE_API_URL}/${routePath}${req.nextUrl.search}`;

    const response = await axios.request({
      method: req.method,
      url,
      headers,
      data: req.method !== "GET" ? await req.json() : undefined,
    });

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    if (isAxiosError(error)) {
      return NextResponse.json(
        {
          error: true,
          message: error.message,
          details: error.response?.data || "TMDB API error",
        },
        { status: error.response?.status || 500 }
      );
    }

    return NextResponse.json(
      {
        error: true,
        message: "Unexpected error in proxy",
        details: (error as Error).message || error,
      },
      { status: 500 }
    );
  }
}

export { handler as GET, handler as POST, handler as PUT, handler as DELETE };
