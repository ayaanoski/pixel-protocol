import React, { useEffect, useRef, ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollAnimationProps {
  children: ReactNode;
  className?: string;
  animation?: 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'zoom' | 'none';
  duration?: number;
  delay?: number;
  start?: string;
}

const ScrollAnimation: React.FC<ScrollAnimationProps> = ({ 
  children, 
  className = '', 
  animation = 'fade-up',
  duration = 1,
  delay = 0,
  start = "top bottom-=100"
}) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    let animationConfig = {};

    switch (animation) {
      case 'fade-up':
        animationConfig = { y: 50, opacity: 0 };
        break;
      case 'fade-down':
        animationConfig = { y: -50, opacity: 0 };
        break;
      case 'fade-left':
        animationConfig = { x: -50, opacity: 0 };
        break;
      case 'fade-right':
        animationConfig = { x: 50, opacity: 0 };
        break;
      case 'zoom':
        animationConfig = { scale: 0.8, opacity: 0 };
        break;
      case 'none':
        animationConfig = { opacity: 0 };
        break;
    }

    gsap.set(element, animationConfig);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start,
        end: "bottom top",
        toggleActions: "play none none reverse",
        markers: false
      }
    });

    tl.to(element, {
      ...Object.fromEntries(
        Object.entries(animationConfig).map(([key]) => [key, key === 'opacity' ? 1 : 0])
      ),
      duration,
      delay,
      ease: "power3.out"
    });

    return () => {
      tl.kill();
    };
  }, [animation, duration, delay, start]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
};

export default ScrollAnimation;