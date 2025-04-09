import { useEffect, useRef, useState } from "react";

export function useInfiniteScrollObserver<T>(data: T[], step = 20) {

  const [visibleData, setVisibleData] = useState<T[]>([]);
  const [count, setCount] = useState(step);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setVisibleData(data.slice(0, count));
  }, [data, count]);

  useEffect(() => {
    if (!loaderRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && count < data.length) {
          setCount((prev) => prev + step);
        }
      },
      { rootMargin: "100px" }
    );

    observer.observe(loaderRef.current);

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [loaderRef, count, data.length]);


  return { visibleData, loaderRef };
}
