// src/hooks/useDragScroll.ts
import { useState, useRef, useEffect } from 'react';

export function useDragScroll() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const startDrag = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    setIsDown(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const stopDrag = () => setIsDown(false);

  const onDrag = (e: React.MouseEvent, callback?: () => void) => {
    if (!isDown || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 1; 
    sliderRef.current.scrollLeft = scrollLeft - walk;
    if (callback) callback(); // Para actualizar las flechas
  };

  return { sliderRef, isDown, startDrag, stopDrag, onDrag };
}