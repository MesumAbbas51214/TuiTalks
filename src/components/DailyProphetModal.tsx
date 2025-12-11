import { useEffect, useRef, useState } from "react";
import type { Interview } from "../types/content";
import styles from "./DailyProphetModal.module.css";
import afterwordGifStyles from "./AfterwordGif.module.css";
import { useBodyLock } from "../hooks/useBodyLock";
import { getProphetArticle } from "../content/prophet";
import { formatRichText } from "../utils/richText";

const FALLBACK_VIDEO_ID = "dQw4w9WgXcQ"; // Playable YouTube fallback
const TRUST_PROCESS_GIF = "https://i.gifer.com/3B3T.gif";

export function DailyProphetModal({
  open,
  interview,
  onClose,
  trackUrl,
}: {
  open: boolean;
  interview: Interview | null;
  onClose: () => void;
  trackUrl?: string;
}) {
  useBodyLock(open);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playInstance, setPlayInstance] = useState(0);

  const toYouTubeEmbed = (url?: string) => {
    if (!url) return undefined;
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/i);
    if (!match) return undefined;
    const videoId = match[1];
    return `https://www.youtube.com/embed/${videoId}?rel=0`;
  };

  const resolvedEmbed =
    toYouTubeEmbed(trackUrl) ?? `https://www.youtube.com/embed/${FALLBACK_VIDEO_ID}?rel=0`;
  const resolvedTitle = trackUrl ? "Recommended track" : "Daily Prophet theme";

  // Always resolve article + derived content to keep hook order stable.
  const article = getProphetArticle(interview?.id ?? "sample");
  const afterwordBody = article.afterword?.body ?? [];
  const afterwordMidpoint = Math.ceil(afterwordBody.length / 2);
  const afterwordColumns = [
    afterwordBody.slice(0, afterwordMidpoint),
    afterwordBody.slice(afterwordMidpoint),
  ];
  const extendedBody = article.extendedBody;

  const renderRichParagraph = (text: string, key: string | number) => (
    <p key={key} dangerouslySetInnerHTML={{ __html: formatRichText(text) }} />
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    setTimeout(() => closeRef.current?.focus(), 0);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open && isPlaying) {
      setIsPlaying(false);
    }
  }, [open, isPlaying]);

  const toggleYouTube = () => {
    if (isPlaying) {
      setIsPlaying(false);
      return;
    }
    setPlayInstance((n) => n + 1); // force iframe reload for autoplay
    setIsPlaying(true);
  };

  if (!open || !interview) return null;

  return (
    <div className={styles.overlay} onClick={onClose} role="dialog" aria-modal="true">
      <div className={`${styles.window} ${styles.paper}`} onClick={(e) => e.stopPropagation()}>
        <button ref={closeRef} className={styles.close} onClick={onClose}>X Close</button>
        <div className={styles.inner}>
          {/* Masthead */}
          <div className={styles.mast}>
            <div className={styles.rule} />
            <div className={styles.brand}>TUI TALKS</div>
            <div className={styles.rule} />
          </div>

          {/* Issue strip */}
          <div className={styles.issueRow}>
            <span>{article.episode}</span>
            <span>{article.interviewee}</span>
            <span>{article.date}</span>
          </div>

          {/* Headline & dek */}
          <h2 className={styles.headline}>{article.headline}</h2>
          {article.dek && <p className={styles.dek}>{article.dek}</p>}

          {/* Two-column layout (article + sidebar) */}
          <div className={styles.layout}>
            <div>
              {article.hero && (
                <img className={styles.hero} src={article.hero.src} alt={article.hero.alt ?? ""} />
              )}

              <div className={`${styles.article} ${styles.dropcap}`}>
                {article.body.map((para, i) => renderRichParagraph(para, i))}
                {/* Signature using the interview data */}
                <p><em>By {interview.author.name} - TUITALKS</em></p>
              </div>
            </div>

            {article.sidebar && (
              <aside className={styles.sidebar}>
                <div className={styles.sidebarTitle}>{article.sidebar.title}</div>
                {article.sidebar.items.map((it, idx) => (
                  <div key={idx} className={styles.sideCard}>
                    {it.img && (
                      <div className={styles.sideImgWrap}>
                        <img className={styles.sideImg} src={it.img} alt="" />
                        <span className={styles.smoke} aria-hidden="true" />
                      </div>
                    )}
                    <strong>{it.title}</strong>
                    {it.text && (
                      <p style={{ margin: 0 }} dangerouslySetInnerHTML={{ __html: formatRichText(it.text) }} />
                    )}
                  </div>
                ))}
                <img
                  className={styles.sidebarGif}
                  src="https://i.gifer.com/19LW.gif"
                  alt="Animated wizardly parchment unfurling in green smoke"
                />
              </aside>
            )}
          </div>

          {article.afterword && (
            <div className={`${styles.afterword} ${styles.enhancedPanel}`}>
              <div className={styles.afterwordHeader}>
                <span className={styles.afterwordBadge}>Reflection</span>
                {article.afterword.title && <h3 className={styles.afterwordTitle}>{article.afterword.title}</h3>}
                <p className={styles.afterwordHint}>Unfiltered notes that live beyond the headline.</p>
              </div>
              <div className={`${styles.afterwordBody} ${styles.afterwordGrid}`}>
                <div className={styles.afterwordColumn}>
                  <div className={styles.afterwordCard}>
                    {afterwordColumns[0].map((para, i) => renderRichParagraph(para, `left-${i}`))}
                  </div>
                </div>
                <div className={afterwordGifStyles.afterwordGifWrap}>
                  <div className={styles.afterwordDivider} aria-hidden="true" />
                  <img
                    className={afterwordGifStyles.afterwordGif}
                    src={TRUST_PROCESS_GIF}
                    alt="Animated parchment divider with floating illustrations"
                  />
                  <div className={styles.afterwordDivider} aria-hidden="true" />
                </div>
                <div className={styles.afterwordColumn}>
                  <div className={styles.afterwordCard}>
                    {afterwordColumns[1].map((para, i) => renderRichParagraph(para, `right-${i}`))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {extendedBody && (
            <div className={`${styles.extendedBody} ${styles.enhancedPanel}`}>
              <div className={styles.extendedMeta}>
                <span className={styles.extendedBadge}>Behind the page</span>
                <div className={styles.extendedHeader}>
                  <div className={styles.rule} aria-hidden="true" />
                  <h3 className={styles.extendedTitle}>{extendedBody.title}</h3>
                  <div className={styles.rule} aria-hidden="true" />
                </div>
                <p className={styles.extendedDek}>A softer corner for the moments that didn’t fit in the main spread.</p>
              </div>
              <div className={styles.extendedLayout}>
                <div className={styles.extendedImageFrame}>
                  <div className={styles.extendedImageGlow} />
                  <img className={styles.extendedImage} src={extendedBody.image.src} alt={extendedBody.image.alt ?? ""} />
                </div>
                <div className={styles.extendedText}>
                  {extendedBody.body.map((para, i) => (
                    renderRichParagraph(para, `extended-${i}`)
                  ))}
                </div>
              </div>
            </div>
          )}

          {resolvedEmbed && (
            <div className={styles.audioBar}>
              <div className={styles.trackInfo}>
                <span className={styles.trackLabel}>Wizarding Wireless pick</span>
                <span className={styles.trackTitle}>{resolvedTitle}</span>
              </div>
              {/* Hidden iframe used only for audio playback */}
              {isPlaying && (
                <iframe
                  key={playInstance}
                  className={styles.hiddenAudioFrame}
                  src={`${resolvedEmbed}&autoplay=1`}
                  title={resolvedTitle}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}
              <button
                type="button"
                className={`${styles.audioControl} ${isPlaying ? styles.playing : ""}`}
                onClick={toggleYouTube}
                aria-pressed={isPlaying}
                aria-label={isPlaying ? "Pause track" : "Play track"}
              >
                <span className={styles.controlIcon} aria-hidden="true" />
                <span className={styles.controlText}>{isPlaying ? "Pause" : "Play"}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
