import Image, { type ImageProps } from "next/image";

import teamLogo from "@/public/images/team_logo.png";

export default function TeamLogo({ className = "", ...props }: Omit<ImageProps, "src" | "alt">) {
  return (
    <Image
      {...props}
      src={teamLogo}
      alt="MAD ROCKET YZUME 團隊隊徽"
      className={`object-contain ${className}`}
    />
  );
}
