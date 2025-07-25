import React, { useEffect, useRef, useState } from "react";

interface TimeScrollPickerProps {
  type: "hours" | "minutes";
  refInput: React.RefObject<HTMLInputElement | null>;
}

const ITEM_HEIGHT = 40;
const REPEAT_COUNT = 3; // сколько раз повторяем список для бесконечной прокрутки

export const TimeScrollPicker = ({ type, refInput }: TimeScrollPickerProps) => {
  const max = type === "hours" ? 23 : 59;
  const baseValues = Array.from({ length: max + 1 }, (_, i) =>
    i.toString().padStart(2, "0")
  );

  // Повторяем массив несколько раз для создания "кольца"
  const values = Array(REPEAT_COUNT)
    .fill(null)
    .flatMap(() => baseValues);

  // Начальный selected — первый элемент из второго повторения (центр)
  const [selected, setSelected] = useState(max + 1); // start at middle repetition index (one full base array)

  const containerRef = useRef<HTMLDivElement>(null);

  // Для тач-драг скролла
  const startY = useRef<number | null>(null);
  const scrollTopStart = useRef<number>(0);

  // Синхронизация значения в input с selected с учетом базового массива
  useEffect(() => {
    if (refInput.current) {
      // selected может быть из повторенного массива, берем индекс внутри базового массива по модулю
      const baseIndex = selected % (max + 1);
      refInput.current.value = baseValues[baseIndex];
    }
  }, [selected, baseValues, max, refInput]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Устанавливаем начальный scrollTop в середину списка
    // Так, чтобы выбран был элемент в центре второго повторения
    el.scrollTop = selected * ITEM_HEIGHT;

    // Функция для проверки и "телепорта" scrollTop в середину, чтобы создать бесконечный скролл
    const checkAndResetScroll = () => {
      if (!el) return;
      const scrollTop = el.scrollTop;
      const totalHeight = values.length * ITEM_HEIGHT;
      const baseHeight = (max + 1) * ITEM_HEIGHT;
      const middleStart = baseHeight; // точка начала второго повторения

      // Если скролл слишком близко к началу или концу — переместить в середину
      if (scrollTop < baseHeight * 0.5) {
        // Сдвигаем скролл вниз на baseHeight (один цикл)
        el.scrollTop = scrollTop + baseHeight;
      } else if (scrollTop > totalHeight - baseHeight * 1.5) {
        // Сдвигаем скролл вверх на baseHeight
        el.scrollTop = scrollTop - baseHeight;
      }
    };

    // Обработчик колеса мыши (ПК)
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = Math.sign(e.deltaY);
      let nextSelected = selected + delta;

      // Чтобы не выйти за пределы массива values, но не обрезаем, т.к. будет телепорт
      if (nextSelected < 0) nextSelected = 0;
      if (nextSelected >= values.length) nextSelected = values.length - 1;

      setSelected(nextSelected);

      // Плавно скроллим к новому элементу
      el.scrollTo({ top: nextSelected * ITEM_HEIGHT, behavior: "smooth" });
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
      // Округляем к ближайшему элементу и обновляем selected
      let index = Math.round(el.scrollTop / ITEM_HEIGHT);

      // Телепортим индекс в пределах массива
      if (index < 0) index = 0;
      if (index >= values.length) index = values.length - 1;

      // Устанавливаем scrollTop по индексу
      el.scrollTo({ top: index * ITEM_HEIGHT, behavior: "smooth" });

      setSelected(index);
      startY.current = null;
    };

    // При прокрутке проверяем позицию и телепортим скролл при необходимости
    const handleScroll = () => {
      checkAndResetScroll();

      if (!el) return;
      // Обновляем selected по позиции прокрутки
      const currentIndex = Math.round(el.scrollTop / ITEM_HEIGHT);
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

  return (
    <div className="time-picker cursor-pointer no-select" style={{ height: ITEM_HEIGHT * 5, overflow: "hidden", userSelect: "none" }}>
      <div
        ref={containerRef}
        className="time-picker-scroll controlled"
        style={{
          overflowY: "scroll",
          height: ITEM_HEIGHT * 5,
          scrollbarWidth: "none", // Firefox
          msOverflowStyle: "none", // IE 10+
          scrollSnapType: "y mandatory",
        }}
      >
        {values.map((val, i) => (
          <div
            key={`${val}-${i}`}
            className={`time-picker-item ${selected === i ? "active" : ""}`}
            style={{
              height: ITEM_HEIGHT,
              lineHeight: `${ITEM_HEIGHT}px`,
              textAlign: "center",
              scrollSnapAlign: "center",
              fontWeight: selected === i ? "bold" : "normal",
              fontSize: selected === i ? "1.2em" : "1em",
              color: selected === i ? "black" : "#aaa",
            }}
          >
            {val}
          </div>
        ))}
      </div>
    </div>
  );
};
