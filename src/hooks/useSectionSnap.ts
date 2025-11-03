import { useCallback, useEffect, useRef, type RefObject } from "react";

const SCROLL_TIMEOUT = 700;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function getActiveIndex(container: HTMLElement, sections: HTMLElement[]) {
  if (!sections.length) {
    return 0;
  }

  const scrollTop = container.scrollTop;
  let closestIndex = 0;
  let smallestDistance = Number.POSITIVE_INFINITY;

  sections.forEach((section, index) => {
    const distance = Math.abs(section.offsetTop - scrollTop);
    if (distance < smallestDistance) {
      smallestDistance = distance;
      closestIndex = index;
    }
  });

  return closestIndex;
}

export function useSectionSnap(containerRef: RefObject<HTMLElement | null>) {
  const isAnimatingRef = useRef(false);
  const currentIndexRef = useRef(0);
  const timeoutRef = useRef<number | undefined>(undefined);
  const scrollToSectionRef = useRef<(id: string) => boolean>(() => false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const getSections = () => Array.from(container.querySelectorAll<HTMLElement>("section"));

    const stopAnimation = () => {
      isAnimatingRef.current = false;
      if (timeoutRef.current !== undefined) {
        window.clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = undefined;
    };

    const scrollToIndex = (index: number) => {
      const sections = getSections();
      const target = sections[index];
      if (!target) {
        return;
      }

      currentIndexRef.current = index;
      isAnimatingRef.current = true;
      target.scrollIntoView({ behavior: "smooth", block: "start" });

      if (timeoutRef.current !== undefined) {
        window.clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = window.setTimeout(stopAnimation, SCROLL_TIMEOUT);
    };

    const handleWheel = (event: WheelEvent) => {
      const deltaY = event.deltaY;
      if (deltaY === 0) {
        return;
      }

      const sections = getSections();
      if (!sections.length) {
        return;
      }

      if (isAnimatingRef.current) {
        event.preventDefault();
        return;
      }

      const direction = deltaY > 0 ? 1 : -1;
      const nextIndex = clamp(currentIndexRef.current + direction, 0, sections.length - 1);
      if (nextIndex === currentIndexRef.current) {
        return;
      }

      event.preventDefault();
      scrollToIndex(nextIndex);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (isAnimatingRef.current) {
        event.preventDefault();
        return;
      }

      const sections = getSections();
      if (!sections.length) {
        return;
      }

      let direction = 0;
      if (event.key === "ArrowDown" || event.key === "PageDown") {
        direction = 1;
      } else if (event.key === "ArrowUp" || event.key === "PageUp") {
        direction = -1;
      }

      if (direction === 0) {
        return;
      }

      event.preventDefault();
      const nextIndex = clamp(currentIndexRef.current + direction, 0, sections.length - 1);
      if (nextIndex === currentIndexRef.current) {
        return;
      }

      scrollToIndex(nextIndex);
    };

    const handleScroll = () => {
      if (isAnimatingRef.current) {
        return;
      }

      const sections = getSections();
      currentIndexRef.current = getActiveIndex(container, sections);
    };

    const scrollToSection = (id: string) => {
      const sections = getSections();
      const index = sections.findIndex((section) => section.id === id);
      if (index === -1) {
        return false;
      }

      scrollToIndex(index);
      return true;
    };

    scrollToSectionRef.current = scrollToSection;

    container.addEventListener("wheel", handleWheel, { passive: false });
    container.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("keydown", handleKeyDown, { passive: false });

    currentIndexRef.current = getActiveIndex(container, getSections());

    return () => {
      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
      stopAnimation();
      scrollToSectionRef.current = () => false;
    };
  }, [containerRef]);

  return useCallback((id: string) => scrollToSectionRef.current(id), []);
}
