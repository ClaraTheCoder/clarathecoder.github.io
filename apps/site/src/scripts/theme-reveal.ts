let current: ViewTransition | undefined;

export function revealTheme(update: () => void, { instant = false, fade = false } = {}) {
  const root = document.documentElement;

  if (instant || !document.startViewTransition || root.hasAttribute('data-raw')) {
    update();
    return;
  }

  const active = document.activeElement;

  if (fade || active?.matches(':focus-visible')) {
    root.dataset.themeTransition = 'fade';
    const transition = document.startViewTransition(update);
    current = transition;
    transition.finished.finally(() => {
      if (current === transition) delete root.dataset.themeTransition;
    });
    return;
  }
  delete root.dataset.themeTransition;

  const origin = active?.closest('.radio-card');
  const rect = origin?.getBoundingClientRect();
  const x = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
  const y = rect ? rect.top + rect.height / 2 : window.innerHeight / 2;
  const radius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y),
  );

  root.style.setProperty('--theme-reveal-x', `${x}px`);
  root.style.setProperty('--theme-reveal-y', `${y}px`);
  root.style.setProperty('--theme-reveal-radius', `${radius}px`);

  current = document.startViewTransition(update);
}
