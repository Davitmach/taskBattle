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

    el.scrollTop = selected * 40;

    // --- Обработчики тача ---
    const handleTouchStart = (e: TouchEvent) => {
      startY.current = e.touches[0].clientY;
      scrollTopStart.current = el.scrollTop;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (startY.current === null) return;

      const currentY = e.touches[0].clientY;
      const diff = startY.current - currentY;
      // Прокрутка вручную
      el.scrollTop = scrollTopStart.current + diff;

      // Если хотим заблокировать скролл страницы при прокрутке внутри
      e.preventDefault();
    };

    const handleTouchEnd = () => {
      // При завершении тача — "привязываемся" к ближайшему элементу
      if (!el) return;
      const index = Math.round(el.scrollTop / 40);
      const clampedIndex = Math.min(Math.max(index, 0), max);
      el.scrollTo({ top: clampedIndex * 40, behavior: "smooth" });
      setSelected(clampedIndex);
      startY.current = null;
    };

    el.addEventListener("touchstart", handleTouchStart, { passive: false });
    el.addEventListener("touchmove", handleTouchMove, { passive: false });
    el.addEventListener("touchend", handleTouchEnd);

    return () => {
      el.removeEventListener("touchstart", handleTouchStart);
      el.removeEventListener("touchmove", handleTouchMove);
      el.removeEventListener("touchend", handleTouchEnd);
    };
  }, [selected, max]);

  return (
    <div className="time-picker">
      <div
        ref={containerRef}
        className="time-picker-scroll controlled"
        // onWheel обработчик, если нужен — оставь или добавь как в прошлом примере
      >
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
