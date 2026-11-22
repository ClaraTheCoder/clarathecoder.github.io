/**
 * Splits the quote into words so `Testimonial.css` can pull them in on scroll.
 * The split copy is aria-hidden and `hidden` until the CSS shows it, so screen
 * readers, raw mode and no-JS keep the original text. Separate file for SSR.
 */
if (typeof customElements !== 'undefined' && !customElements.get('testimonial-words')) {
  customElements.define(
    'testimonial-words',
    class extends HTMLElement {
      #observer = new MutationObserver(() => this.#split());

      connectedCallback() {
        this.#split();
      }

      disconnectedCallback() {
        this.#observer.disconnect();
      }

      #split() {
        this.#observer.disconnect();
        const source = this.querySelector(':scope > .testimonial__source');
        if (!source) return;

        const words = source.cloneNode(true) as HTMLElement;
        words.className = 'testimonial__words';
        words.setAttribute('aria-hidden', 'true');
        words.hidden = true;

        const walker = document.createTreeWalker(words, NodeFilter.SHOW_TEXT);
        const texts: Text[] = [];
        while (walker.nextNode()) texts.push(walker.currentNode as Text);

        let index = 0;
        for (const text of texts) {
          const parts = text.data.split(/(\s+)/).filter(Boolean);
          text.replaceWith(
            ...parts.map((part) => {
              if (/^\s+$/.test(part)) return part;
              const word = document.createElement('span');
              word.className = 'testimonial__word';
              word.style.setProperty('--testimonial-word', String(index++));
              word.textContent = part;
              return word;
            }),
          );
        }
        words.style.setProperty('--testimonial-words', String(index));

        this.querySelector(':scope > .testimonial__words')?.remove();
        this.append(words);
        this.setAttribute('data-split', '');
        // Keep the copy in step if React re-renders the quote (Storybook controls).
        this.#observer.observe(source, { subtree: true, childList: true, characterData: true });
      }
    },
  );
}
