"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  // CarouselNext,
  // CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton
import Autoplay from "embla-carousel-autoplay";
import { useQuery } from "@tanstack/react-query";
import { TrendingService } from "@/services/trending";

export default function TopPicks() {
  const { data, isLoading, isError } = useQuery({
    queryKey: [TrendingService.getTrendingAll.key],
    queryFn: TrendingService.getTrendingAll.call,
  });

  return (
    <div className="p-4 md:p-6 w-full flex flex-col gap-3">
      <span className="text-xl text-primary/60 font-medium whitespace-nowrap">
        <span className="text-xl text-primary/40 font-medium">
          {"\u2022"}&nbsp;&nbsp;
        </span>
        Today&apos;s Spotlight
      </span>

      {isLoading ? (
          <Skeleton className="aspect-video w-full rounded-2xl" />
      ) : isError ? (
        <div className="w-full flex items-center justify-center p-6 text-destructive">
          Failed to load top picks. Please try again later.
        </div>
      ) : (
        <Carousel
          className="w-full"
          opts={{
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 5000,
            }),
          ]}
        >
          <CarouselContent>
            {data?.data?.results?.map((data, index) => (
              <CarouselItem key={index}>
                <Card className="p-0 overflow-hidden">
                  <CardContent
                    className="relative flex aspect-video items-end justify-start p-6 overflow-hidden rounded-2xl shadow-md bg-cover bg-center"
                    style={{
                      backgroundImage: `url(https://image.tmdb.org/t/p/w780${data.backdrop_path})`,
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                    <div className="relative z-10 space-y-2 w-full">
                      <h2 className="text-2xl font-bold text-secondary dark:text-primary">
                        {data.name || data.original_name || data.original_title}
                      </h2>
                      <p className="text-sm text-secondary/80 dark:text-primary/80 line-clamp-1 md:line-clamp-3">
                        {data.overview}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-secondary/70 dark:text-primary/70">
                        <span>
                          ⭐{" "}
                          {data.vote_average.toFixed() ||
                            data.popularity.toFixed()}
                        </span>
                        <span>
                          📅{" "}
                          {data?.first_air_date ||
                            (data?.release_date &&
                              new Date(
                                data?.first_air_date || data?.release_date
                              ).toLocaleDateString())}
                        </span>
                        <span className="uppercase">
                          {data.original_language}
                        </span>
                      </div>
                    </div>

                    <span className="absolute top-4 left-4 z-10 text-xl font-semibold bg-secondary/10 dark:bg-primary/10 text-secondary dark:text-primary px-3 py-1 rounded-md backdrop-blur-md">
                      #{index + 1}
                    </span>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* <CarouselPrevious className="left-3" />
          <CarouselNext className="right-3" /> */}
        </Carousel>
      )}
    </div>
  );
}
