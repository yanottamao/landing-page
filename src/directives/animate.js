export function animateDirective() {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return {
      mounted(element) {
        element.dataset.animate = 'in-view';
      },
    };
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.dataset.animate = 'in-view';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });

  return {
    mounted(element) {
      observer.observe(element);
    },
    unmounted(element) {
      observer.unobserve(element);
    },
  };
}
