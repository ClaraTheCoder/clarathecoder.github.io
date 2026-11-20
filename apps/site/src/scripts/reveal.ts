const sections = document.querySelectorAll<HTMLElement>('.page > :not(.page-hero)');

const observer = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      (entry.target as HTMLElement).dataset.reveal = 'shown';
      observer.unobserve(entry.target);
    }
  },
  { rootMargin: '0px 0px -20% 0px' },
);

for (const section of sections) {
  if (section.getBoundingClientRect().top < window.innerHeight) continue;
  section.dataset.reveal = 'pending';
  observer.observe(section);
}
