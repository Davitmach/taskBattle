import React, { useEffect, useRef, useState } from "react";

interface TimeScrollPickerProps {
  type: "hours" | "minutes";
  refInput: React.RefObject<HTMLInputElement | null>;
}

const ITEM_HEIGHT = 40;
const REPEAT_COUNT = 3;

export const TimeScrollPicker = ({ type, refInput }: TimeScrollPickerProps) => {
  const max = type === "hours" ? 23 : 59;
  const baseValues = Array.from({ length: max + 1 }, (_, i) =>
    i.toString().padStart(2, "0")
  );

  const values = Array(REPEAT_COUNT)
    .fill(null)
    .flatMap(() => baseValues);

  // Начинаем с середины
  const [selected, setSelected] = useState(max + 1);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (refInput.current) {
      const baseIndex = selected % (max + 1);
      refInput.current.value = baseValues[baseIndex];
    }
  }, [selected, baseValues, max, refInput]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Центрируем выбранный элемент по вертикали — scrollTop = элемент * высота - половина контейнера
    el.scrollTop = selected * ITEM_HEIGHT - ITEM_HEIGHT / 2;

    const baseHeight = (max + 1) * ITEM_HEIGHT;
    const totalHeight = values.length * ITEM_HEIGHT;

    const checkAndResetScroll = () => {
      if (!el) return;
      const scrollTop = el.scrollTop;

      if (scrollTop < baseHeight * 0.5) {
        el.scrollTop = scrollTop + baseHeight;
      } else if (scrollTop > totalHeight - baseHeight * 1.5) {
        el.scrollTop = scrollTop - baseHeight;
      }
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = Math.sign(e.deltaY);
      let nextSelected = selected + delta;
      if (nextSelected < 0) nextSelected = 0;
      if (nextSelected >= values.length) nextSelected = values.length - 1;

      setSelected(nextSelected);
      el.scrollTo({ top: nextSelected * ITEM_HEIGHT - ITEM_HEIGHT / 2, behavior: "smooth" });
    };

    const handleTouchStart = (e: TouchEvent) => {
      startY.current = e.touches[0].clientY;
      scrollTopStart.current = el.scrollTop;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (startY.current === null) return;
      const currentY = e.touches[0].clientY;
      const diff = startY.current - currentY;
      el.scrollTop = scrollTopStart.current + diff;
      e.preventDefault();
    };

    const handleTouchEnd = () => {
      if (!el) return;
      let index = Math.round((el.scrollTop + ITEM_HEIGHT / 2) / ITEM_HEIGHT);
      if (index < 0) index = 0;
      if (index >= values.length) index = values.length - 1;
      el.scrollTo({ top: index * ITEM_HEIGHT - ITEM_HEIGHT / 2, behavior: "smooth" });
      setSelected(index);
      startY.current = null;
    };

    const handleScroll = () => {
      checkAndResetScroll();
      if (!el) return;
      const currentIndex = Math.round((el.scrollTop + ITEM_HEIGHT / 2) / ITEM_HEIGHT);
      setSelected(currentIndex);
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    el.addEventListener("touchstart", handleTouchStart, { passive: false });
    el.addEventListener("touchmove", handleTouchMove, { passive: false });
    el.addEventListener("touchend", handleTouchEnd);
    el.addEventListener("scroll", handleScroll);

    return () => {
      el.removeEventListener("wheel", handleWheel);
      el.removeEventListener("touchstart", handleTouchStart);
      el.removeEventListener("touchmove", handleTouchMove);
      el.removeEventListener("touchend", handleTouchEnd);
      el.removeEventListener("scroll", handleScroll);
    };
  }, [max, values, selected]);

  // Для тач-драг
  const startY = useRef<number | null>(null);
  const scrollTopStart = useRef<number>(0);

  return (
    <div
      className="time-picker cursor-pointer no-select"
      style={{
        height: ITEM_HEIGHT,
        overflow: "hidden",
        userSelect: "none",
        position: "relative",
        width: 60, // можно подстроить
        border: "1px solid #ccc",
        borderRadius: 6,
      }}
    >
      <div
        ref={containerRef}
        className="time-picker-scroll controlled"
        style={{
          overflowY: "scroll",
          height: ITEM_HEIGHT,
          scrollSnapType: "y mandatory",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          paddingTop: ITEM_HEIGHT / 2,
          paddingBottom: ITEM_HEIGHT / 2,
          boxSizing: "content-box",
        }}
      >
        {values.map((val, i) => {
          const isActive = selected === i;
          return (
            <div
              key={`${val}-${i}`}
              className={`time-picker-item ${isActive ? "active" : ""}`}
              style={{
                height: ITEM_HEIGHT,
                lineHeight: `${ITEM_HEIGHT}px`,
                textAlign: "center",
                scrollSnapAlign: "center",
                fontWeight: isActive ? "bold" : "normal",
                fontSize: isActive ? "1.3em" : "1em",
                color: isActive ? "black" : "#999",
              }}
            >
              {val}
            </div>
          );
        })}
      </div>
      {/* Горизонтальная линия по центру для подсветки активного элемента */}
      <div
        style={{
          position: "absolute",
          top: ITEM_HEIGHT / 2,
          left: 0,
          right: 0,
          height: 0,
          borderTop: "2px solid #000",
          pointerEvents: "none",
        }}
      />
    </div>
  );
};
