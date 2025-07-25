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
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (refInput.current) {
      refInput.current.value = values[selected];
    }
  }, [selected]);

  useEffect(() => {
    const el = containerRef.current;
    if (el) el.scrollTop = selected * 40;
  }, []);

  const handleScroll = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      const el = containerRef.current;
      if (!el) return;
      const index = Math.round(el.scrollTop / 40);
      el.scrollTo({ top: index * 40, behavior: "smooth" });
      setSelected(Math.max(0, Math.min(index, max)));
    }, 100);
  };

  return (
    <div className="time-picker">
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="time-picker-scroll single"
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
