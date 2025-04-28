"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { ClapperboardIcon, HomeIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Separator } from "@/components/ui/separator";
import { ReactTyped } from "react-typed";
import { useActiveSectionStore } from "@/hooks/stores/use-active-section";

const navItems = [
  {
    id: "btn-home",
    sectionId: "section_home",
    icon: HomeIcon,
    tooltip: "Your Movie Hub 🎥",
  },
  {
    id: "btn-movie",
    sectionId: "section_movie",
    icon: ClapperboardIcon,
    tooltip: "Movie Playground 🎬",
  },
];

export default function Header() {
  const { activeSection } = useActiveSectionStore();

  return (
    <div className="p-4 bg-secondary/50 rounded-2xl flex items-center justify-between border gap-3 shadow-lg w-full sticky top-4 z-50">
      <div className="w-max">
        <ReactTyped
          strings={[
            "🎬 Movie Time!",
            "🍿 Popcorn Ready?",
            "🔥 New & Hot",
            "🌟 Top Picks",
            "🎥 Now Showing",
            "🎉 Just Dropped",
            "▶️ Hit Play!",
          ]}
          typeSpeed={100}
          backSpeed={50}
          loop
          className="text-xl md:text-3xl whitespace-nowrap text-primary font-bold font-courier"
        />
      </div>
      <div className="flex flex-row gap-2 justify-center items-start h-9">
        {navItems.map(({ id, icon: Icon, tooltip, sectionId }) => (
          <TooltipProvider key={id}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  className={cn(
                    activeSection?.sectionId !== sectionId && "text-primary/80"
                  )}
                  id={id}
                  onClick={() => {
                    const scrollTop = Math.max(
                      (document.getElementById(sectionId)?.offsetTop || 0) -
                        112,
                      0
                    );

                    if (typeof window !== "undefined") {
                      window?.scrollTo({
                        behavior: "smooth",
                        top: scrollTop,
                      });
                    }
                  }}
                >
                  <Icon className="size-6" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>{tooltip}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
        <Separator orientation="vertical" />
        <ModeToggle />
      </div>
    </div>
  );
}
