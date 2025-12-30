import { cn } from "@/lib/utils";
import { Play } from "lucide-react";

interface VideoPlaceholderProps {
  className?: string;
  aspectRatio?: "video" | "square" | "wide";
  title?: string;
}

export function VideoPlaceholder({
  className,
  aspectRatio = "video",
  title = "Video Placeholder",
}: VideoPlaceholderProps) {
  return (
    <div
      className={cn(
        "relative w-full bg-gradient-to-br from-brand-orange via-brand-red to-brand-blue flex items-center justify-center overflow-hidden group",
        {
          "aspect-video": aspectRatio === "video",
          "aspect-square": aspectRatio === "square",
          "aspect-[21/9]": aspectRatio === "wide",
        },
        className
      )}
    >
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative z-10 flex flex-col items-center justify-center space-y-4">
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <Play className="w-8 h-8 md:w-10 md:h-10 text-white fill-white" />
        </div>
        <span className="text-white text-lg md:text-xl font-semibold tracking-wide">
          {title}
        </span>
      </div>
    </div>
  );
}
