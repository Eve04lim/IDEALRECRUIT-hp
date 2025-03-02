// src/components/hooks/useScrollAnimation.ts
import { useEffect, useState } from 'react';

export function useScrollAnimation() {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
            entry.target.classList.add('in-view');
          }
        });
      },
      {
        threshold: 0.3
      }
    );

    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return activeSection;
}

