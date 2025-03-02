// src/components/hooks/useSmoothScroll.ts
export function useSmoothScroll() {
    const scrollToSection = (sectionId: string) => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    };
  
    return scrollToSection;
  }
  