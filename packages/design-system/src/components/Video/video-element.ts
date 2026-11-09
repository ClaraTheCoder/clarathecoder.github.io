/**
 * Sets `data-ready` / `data-revealed` so `Video.css` can cover the native controls
 * with the poster and play button until first play. Separate file for SSR.
 */
if (typeof customElements !== 'undefined' && !customElements.get('clara-video')) {
  customElements.define(
    'clara-video',
    class extends HTMLElement {
      connectedCallback() {
        const video = this.querySelector('video');
        if (!video) return;

        const reveal = () => this.setAttribute('data-revealed', '');
        video.addEventListener('play', reveal, { once: true });
        // Focus reaching the covered controls must reveal them (WCAG 2.4.11).
        video.addEventListener('focus', reveal, { once: true });
        this.querySelector('.video__play')?.addEventListener('click', () => {
          video.focus();
          void video.play();
        });
        this.addEventListener('click', (event) => {
          if (event.target === this) void video.play();
        });
        this.setAttribute('data-ready', '');
      }
    },
  );
}
