import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className, hover = true }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-lg overflow-hidden shadow-lg bg-white",
        hover && "transform transition-transform duration-300 hover:scale-105",
        className
      )}
    >
      {children}
    </div>
  );
}

interface CardImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function CardImage({ src, alt, className }: CardImageProps) {
  return (
    <div className={cn("relative aspect-[4/3] w-full", className)}>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="w-full h-full bg-gradient-to-br from-athletic-500 to-brand-red flex items-center justify-center text-white text-sm font-semibold">
        {alt}
      </div>
    </div>
  );
}

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export function CardContent({ children, className }: CardContentProps) {
  return <div className={cn("p-6", className)}>{children}</div>;
}

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

export function CardTitle({ children, className }: CardTitleProps) {
  return (
    <h3 className={cn("text-2xl md:text-3xl font-bold text-brand-navy mb-3", className)}>
      {children}
    </h3>
  );
}

interface CardDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export function CardDescription({ children, className }: CardDescriptionProps) {
  return (
    <p className={cn("text-gray-600 text-base leading-relaxed", className)}>
      {children}
    </p>
  );
}
