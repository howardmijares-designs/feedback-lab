import { cn } from "@/lib/utils";

export interface IconProps extends React.SVGAttributes<SVGElement> {
  name: string;
}

export function Icon({ name, className, ...props }: IconProps) {
  if (name === "circle-notch") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinecap="round"
        className={cn(className)}
        {...props}
      >
        <path d="M12 3a9 9 0 1 0 9 9" />
      </svg>
    );
  }
  return null;
}
