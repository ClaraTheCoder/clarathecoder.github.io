const READING_LINE = 0.25;

const USER_SCROLL = ['wheel', 'touchmove', 'keydown'] as const;

const clamp = (value: number) => Math.min(1, Math.max(0, value));

if (typeof customElements !== 'undefined' && !customElements.get('toc-progress')) {
  customElements.define(
    'toc-progress',
    class extends HTMLElement {
      #frame = 0;
      #sections: { item: HTMLElement; link: HTMLAnchorElement; target: HTMLElement }[] = [];
      #pinned = -1;
      #resize = new ResizeObserver(() => this.#schedule());
      #schedule = () => {
        if (!this.#frame) this.#frame = requestAnimationFrame(this.#update);
      };
      #pinToHash = () => {
        this.#pinned = this.#sections.findIndex(({ link }) => link.hash === location.hash);
        this.#schedule();
      };
      #unpin = () => {
        if (this.#pinned === -1) return;
        this.#pinned = -1;
        this.#schedule();
      };
      #onClick = (event: MouseEvent) => {
        const link = (event.target as Element).closest('a');
        const index = this.#sections.findIndex((section) => section.link === link);
        if (index === -1) return;
        this.#pinned = index;
        this.#schedule();
      };

      connectedCallback() {
        this.#sections = [...this.querySelectorAll<HTMLAnchorElement>('a[href^="#"]')].flatMap(
          (link) => {
            const target = document.getElementById(decodeURIComponent(link.hash.slice(1)));
            const item = link.closest('li');
            return target && item ? [{ item, link, target }] : [];
          },
        );
        if (!this.#sections.length) return;

        addEventListener('scroll', this.#schedule, { passive: true });
        addEventListener('hashchange', this.#pinToHash);
        for (const type of USER_SCROLL) addEventListener(type, this.#unpin, { passive: true });
        this.addEventListener('click', this.#onClick);
        this.#resize.observe(document.documentElement);
        if (location.hash) this.#pinToHash();
        this.#update();
      }

      disconnectedCallback() {
        removeEventListener('scroll', this.#schedule);
        removeEventListener('hashchange', this.#pinToHash);
        for (const type of USER_SCROLL) removeEventListener(type, this.#unpin);
        this.removeEventListener('click', this.#onClick);
        this.#resize.disconnect();
        cancelAnimationFrame(this.#frame);
      }

      #update = () => {
        this.#frame = 0;
        const viewport = innerHeight;
        const remaining = document.documentElement.scrollHeight - viewport - scrollY;
        const line =
          viewport * (READING_LINE + (1 - READING_LINE) * clamp(1 - remaining / viewport));

        const tops = this.#sections.map(({ target }) => target.getBoundingClientRect().top);
        const current =
          this.#pinned === -1 ? tops.filter((top) => top <= line).length - 1 : this.#pinned;

        this.#sections.forEach(({ item, link }, i) => {
          const next = tops[i + 1];
          const progress =
            this.#pinned !== -1 || next === undefined
              ? Number(i < current)
              : clamp((line - tops[i]!) / (next - tops[i]!));
          item.style.setProperty('--toc-progress', String(progress));
          item.toggleAttribute('data-read', i < current);
          if (i === current) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      };
    },
  );
}
