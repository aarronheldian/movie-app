import HomeContainer from "@/containers/home";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Movie App | Discover Trending Movies & TV Shows",
    description:
      "Explore the latest trending movies and TV shows with Movie App. Dive into detailed info, ratings, and trailers—all in one cinematic experience.",
  };
}

export default function HomePage() {
  return <HomeContainer />;
}
