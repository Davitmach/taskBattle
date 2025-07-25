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

  useEffect(() => {
    if (refInput.current) {
      refInput.current.value = values[selected];
    }
  }, [selected]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollTop = selected * 40;
  }, []);

  const handleScroll = () => {
    const el = containerRef.current;
    if (!el) return;
    const index = Math.round(el.scrollTop / 40);
    setSelected(Math.min(Math.max(index, 0), max));
  };

  return (
    <div className="time-picker">
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="time-picker-scroll"
      >
        <div style={{ height: "80px" }} />
        {values.map((val, i) => (
          <div
            key={val}
            className={`time-picker-item ${selected === i ? "active" : ""}`}
          >
            {val}
          </div>
        ))}
        <div style={{ height: "80px" }} />
      </div>
    </div>
  );
};
