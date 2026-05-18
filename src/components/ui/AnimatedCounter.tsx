"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";

interface AnimatedCounterProps {
  to: number;
  suffix?: string;
  duration?: number;
}

export const AnimatedCounter = ({
  to,
  suffix = "",
  duration = 1,
}: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  const isInView = useInView(ref, {
    once: true,
    margin: "-80px",
  });

  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;

    hasAnimated.current = true;

    const controls = animate(0, to, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => setCount(v),
    });

    return () => controls.stop();
  }, [isInView, to, duration]);

  const formatted =
    to % 1 !== 0
      ? count.toFixed(1)
      : Math.floor(count).toLocaleString();

  return (
    <span ref={ref}>
      {formatted}
      {suffix}
    </span>
  );
}