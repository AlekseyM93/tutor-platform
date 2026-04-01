const CANVA_EMBED_SRC =
  'https://www.canva.com/design/DAHFoe9yZ_U/ZvRSLyL9TNWPLydWtqihsA/view?embed';
const CANVA_VIEW_URL =
  'https://www.canva.com/design/DAHFoe9yZ_U/ZvRSLyL9TNWPLydWtqihsA/view?utm_content=DAHFoe9yZ_U&utm_campaign=designshare&utm_medium=embeds&utm_source=link';

/**
 * Встраивание макета из Canva (разноцветная презентация про этикет онлайн-класса).
 */
export function CanvaDesignEmbed() {
  return (
    <figure className="canva-embed-figure">
      <div className="canva-embed-shell">
        <div className="canva-embed-ratio">
          <iframe
            title="Презентация Canva: ценности этикета онлайн-класса"
            loading="lazy"
            className="canva-embed-iframe"
            src={CANVA_EMBED_SRC}
            allowFullScreen
            allow="fullscreen"
          />
        </div>
      </div>
      <figcaption className="canva-embed-caption">
        <a
          href={CANVA_VIEW_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="canva-embed-link"
        >
          Разноцветная «Ценности этикета» для онлайн-класса — образование (презентация)
        </a>
        <span className="canva-embed-author"> · автор: Леха Морозович</span>
      </figcaption>
    </figure>
  );
}
