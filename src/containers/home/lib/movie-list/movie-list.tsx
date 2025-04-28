"use client";

import { useState } from "react";
import { TrendingService } from "@/services/trending";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import { MovieService } from "@/services/movies";
import { Input } from "@/components/ui/input";

export default function MovieList() {
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading, isError } = useQuery({
    queryKey: [TrendingService.getTrendingAll.key, searchQuery],
    queryFn: async () => {
      if (searchQuery.trim()) {
        return MovieService.getSearchMovie.call({ query: searchQuery, page: 1 });
      } else {
        return TrendingService.getTrendingAll.call();
      }
    },
  });

  return (
    <div className="p-4 md:p-6 bg-secondary/80 rounded-xl flex flex-col border gap-4 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 items-center">
        <span className="text-lg text-primary/60 font-medium">
          <span className="text-lg text-primary/40 font-medium">
            {"\u2022"}&nbsp;&nbsp;
          </span>
          Movie List
        </span>
        <Input
          placeholder="Search movie..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full"
        />
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="w-full aspect-[4/5] rounded-lg" />
          ))}
        </div>
      ) : isError ? (
        <div className="flex items-center justify-center h-60 text-destructive">
          Failed to load movies.
        </div>
      ) : (
        <ScrollArea className="max-h-[480px] h-[480px] rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {data?.data?.results?.length ? (
              data.data.results.map((movie) => (
                <div
                  key={movie.id}
                  className="relative w-full aspect-[4/5] overflow-hidden rounded-lg border group"
                >
                  {/* Poster */}
                  {movie.poster_path ? (
                    <Image
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.original_title || movie.name || "Movie Poster"}
                      fill
                      className="object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center text-sm text-muted-foreground rounded-lg">
                      No Image
                    </div>
                  )}

                  {/* Overlay Details */}
                  <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <h3 className="text-base font-semibold truncate text-secondary dark:text-primary">
                      {movie.original_title || movie.name}
                    </h3>
                    <p className="text-xs text-secondary/80 dark:text-primary/80 line-clamp-2 mb-2">
                      {movie.overview || "No description available."}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-secondary/70 dark:text-primary/70">
                      <span>
                        ⭐ {movie.vote_average.toFixed() || movie.popularity.toFixed()}
                      </span>
                      <span>
                        📅 {movie.first_air_date || (movie.release_date &&
                          new Date(movie.first_air_date || movie.release_date).toLocaleDateString())}
                      </span>
                      <span className="uppercase">
                        {movie.original_language}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-muted-foreground py-20">
                No movies found.
              </div>
            )}
          </div>
        </ScrollArea>
      )}
    </div>
  );
}
