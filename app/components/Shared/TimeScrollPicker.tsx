import React, { useEffect, useRef, useState } from "react";

interface TimeScrollPickerProps {
  type: "hours" | "minutes";
  refInput: React.RefObject<HTMLInputElement | null>;
}

export const TimeScrollPicker = ({ type, refInput }: TimeScrollPickerProps) => {
  const max = type === "hours" ? 23 : 59;
  const values = Array.from({ length: max + 1 }, (_, i) =>
    i.toString().padStart(2, "0")
  );

  const [selected, setSelected] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Для тач-драг скролла
  const startY = useRef<number | null>(null);
  const scrollTopStart = useRef<number>(0);

  useEffect(() => {
    if (refInput.current) {
      refInput.current.value = values[selected];
    }
  }, [selected]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Инициализация прокрутки
    el.scrollTop = selected * 40;

    // Обработчик колеса мыши (ПК)
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = Math.sign(e.deltaY);

      setSelected((prev) => {
        let next = prev + delta;
        if (next < 0) next = 0;
        if (next > max) next = max;

        el.scrollTo({ top: next * 40, behavior: "smooth" });

        if (refInput.current) {
          refInput.current.value = values[next];
        }

        return next;
      });
    };

    // Обработчики тача (мобильные)
    const handleTouchStart = (e: TouchEvent) => {
      startY.current = e.touches[0].clientY;
      scrollTopStart.current = el.scrollTop;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (startY.current === null) return;

      const currentY = e.touches[0].clientY;
      const diff = startY.current - currentY;
      el.scrollTop = scrollTopStart.current + diff;

      e.preventDefault(); // предотвращаем прокрутку страницы
    };

    const handleTouchEnd = () => {
      if (!el) return;
      const index = Math.round(el.scrollTop / 40);
      const clampedIndex = Math.min(Math.max(index, 0), max);
      el.scrollTo({ top: clampedIndex * 40, behavior: "smooth" });
      setSelected(clampedIndex);
      startY.current = null;
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    el.addEventListener("touchstart", handleTouchStart, { passive: false });
    el.addEventListener("touchmove", handleTouchMove, { passive: false });
    el.addEventListener("touchend", handleTouchEnd);

    return () => {
      el.removeEventListener("wheel", handleWheel);
      el.removeEventListener("touchstart", handleTouchStart);
      el.removeEventListener("touchmove", handleTouchMove);
      el.removeEventListener("touchend", handleTouchEnd);
    };
  }, [max, values, refInput]);

  return (
    <div className="time-picker cursor-pointer no-select">
      <div ref={containerRef} className="time-picker-scroll controlled">
        {values.map((val, i) => (
          <div
            key={val}
            className={`time-picker-item ${selected === i ? "active" : ""}`}
          >
            {val}
          </div>
        ))}
      </div>
    </div>
  );
};
