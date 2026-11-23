const targets = document.querySelectorAll<HTMLElement>('.page > :not(.page-hero)');

const observer = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      (entry.target as HTMLElement).dataset.reveal = 'shown';
      observer.unobserve(entry.target);
    }
  },
  { rootMargin: '0px 0px -10% 0px' },
);

const revealLine = window.innerHeight * 0.8;
const scrollLeft = document.documentElement.scrollHeight - window.innerHeight - window.scrollY;

for (const target of targets) {
  const { top } = target.getBoundingClientRect();
  // Already past the reveal line, or too near the end of the page to ever reach it.
  if (top < revealLine || top - scrollLeft >= revealLine) continue;
  target.dataset.reveal = 'pending';
  observer.observe(target);
}
