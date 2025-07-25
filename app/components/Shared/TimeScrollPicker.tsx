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

    el.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      el.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <div className="time-picker">
      <div
        ref={containerRef}
        className="time-picker-scroll controlled"
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
