import { useState, useEffect, useRef } from "react";

const COLLAPSE_DURATION = 200;
const GAP_DELAY = 150;
const APPEAR_DURATION = 250;

export function useGridAnimation(items) {
  const [displayed, setDisplayed] = useState(items);
  const [phase, setPhase] = useState("idle");
  const prevRef = useRef(items);

  useEffect(() => {
    if (prevRef.current === items) return;

    setPhase("collapsing");

    const collapseTimer = setTimeout(() => {
      setDisplayed(items);
      prevRef.current = items;
      setPhase("hidden");
    }, COLLAPSE_DURATION);

    return () => clearTimeout(collapseTimer);
  }, [items]);

  useEffect(() => {
    if (phase !== "hidden") return;

    const gapTimer = setTimeout(() => setPhase("appearing"), GAP_DELAY);

    return () => clearTimeout(gapTimer);
  }, [phase]);

  useEffect(() => {
    if (phase !== "appearing") return;

    const appearTimer = setTimeout(() => setPhase("idle"), APPEAR_DURATION);

    return () => clearTimeout(appearTimer);
  }, [phase]);

  const gridClassName =
    phase === "idle"
      ? "list-projects__grid"
      : `list-projects__grid list-projects__grid--${phase}`;

  return { displayed, gridClassName };
}
