"use client";

import { useMediaQuery } from "@/lib/use-media-query";

interface TextFormattedProps {
  text: string;
  length?: number;
}

const TextFormatted = (props: TextFormattedProps) => {
  const { text, length } = props;
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <span className="text-nowrap">
      {isDesktop
        ? text
        : text.length > (length ? length : 15)
        ? text.substring(0, length ? length : 15) + "..."
        : text}
    </span>
  );
};

export { TextFormatted };
