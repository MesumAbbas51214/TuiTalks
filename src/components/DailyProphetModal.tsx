import { useEffect, useRef, useState } from "react";
import type { Interview } from "../types/content";
import styles from "./DailyProphetModal.module.css";
import { useBodyLock } from "../hooks/useBodyLock";
import { getProphetArticle } from "../content/prophet";

const DAILY_PROPHET_THEME =
  "data:audio/wav;base64,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" +
  "sAICHA==";

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
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const fallbackTrack = {
    url: DAILY_PROPHET_THEME,
    title: "Daily Prophet theme",
  };

  const resolvedTrack = trackUrl ?? fallbackTrack.url;
  const resolvedTitle = trackUrl ? "Recommended track" : fallbackTrack.title;

  // Always resolve article + derived content to keep hook order stable.
  const article = getProphetArticle(interview?.id ?? "sample");

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    setTimeout(() => closeRef.current?.focus(), 0);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;

    const handleEnded = () => setIsPlaying(false);
    el.addEventListener("ended", handleEnded);

    const startPlayback = async () => {
      try {
        await el.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
    };

    if (open) {
      el.currentTime = 0;
      el.load();
      void startPlayback();
    } else {
      el.pause();
      el.currentTime = 0;
      setIsPlaying(false);
    }

    return () => {
      el.removeEventListener("ended", handleEnded);
      el.pause();
      el.currentTime = 0;
      setIsPlaying(false);
    };
  }, [open, resolvedTrack]);

  const toggleAudio = () => {
    const el = audioRef.current;
    if (!el) return;
    if (el.paused) {
      el
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    } else {
      el.pause();
      setIsPlaying(false);
    }
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
                {article.body.map((para, i) => <p key={i}>{para}</p>)}
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
                    {it.text && <p style={{ margin: 0 }}>{it.text}</p>}
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
            <div className={styles.afterword}>
              {article.afterword.title && <h3 className={styles.afterwordTitle}>{article.afterword.title}</h3>}
              <div className={styles.afterwordBody}>
                {article.afterword.body.map((para, i) => <p key={i}>{para}</p>)}
              </div>
            </div>
          )}

          {(trackUrl || fallbackTrack) && (
            <div className={styles.audioBar}>
              <audio
                ref={audioRef}
                src={resolvedTrack}
                preload="auto"
              />
              <div className={styles.trackInfo}>
                <span className={styles.trackLabel}>Wizarding Wireless pick</span>
                <span className={styles.trackTitle}>{resolvedTitle}</span>
              </div>
              <button
                type="button"
                className={`${styles.audioControl} ${isPlaying ? styles.playing : ""}`}
                onClick={toggleAudio}
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
