import { useEffect, useState } from "react";
import styles from "./CountdownTimer.module.css";

type Props = {
  /** Цільова дата у форматі ISO 8601 */
  targetDate?: string;
};

const pad = (n: number) => String(n).padStart(2, "0");

export default function CountdownTimer({
  targetDate = new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
}: Props) {
  const [now, setNow] = useState<number>(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const targetMs = new Date(targetDate).getTime();
  const diff = Math.max(0, targetMs - now);

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  const isFinished = diff === 0 && targetMs <= now;

  if (isFinished) {
    return (
      <div className={styles.countdown} role="status" aria-live="polite">
        <span className={styles.finishedText}>Подія вже відбулась</span>
      </div>
    );
  }

  return (
    <div
      className={styles.countdown}
      role="timer"
      aria-live="polite"
      aria-atomic="true"
      aria-label={`Залишилось ${days} днів ${hours} годин ${minutes} хвилин ${seconds} секунд`}
    >
      <div className={styles.segment}>
        <span className={styles.value}>{pad(days)}</span>
        <span className={styles.label}>днів</span>
      </div>

      <span className={styles.separator} aria-hidden="true">
        :
      </span>

      <div className={styles.segment}>
        <span className={styles.value}>{pad(hours)}</span>
        <span className={styles.label}>годин</span>
      </div>

      <span className={styles.separator} aria-hidden="true">
        :
      </span>

      <div className={styles.segment}>
        <span className={styles.value}>{pad(minutes)}</span>
        <span className={styles.label}>хвилин</span>
      </div>

      <span className={styles.separator} aria-hidden="true">
        :
      </span>

      <div className={`${styles.segment} ${styles.seconds}`}>
        <span className={styles.value}>{pad(seconds)}</span>
        <span className={styles.label}>секунд</span>
      </div>
    </div>
  );
}
