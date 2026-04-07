import styles from "./RegistrationModal.module.css";
import CountdownTimer from "../CountdownTimer/CountdownTimer";
import RegistrationForm from "../RegistrationForm/RegistrationForm";
import { TARGET_DATE } from "../../../constants/dateTime.ts";

type RegistrationModalProps = {
  onClose: () => void;
};

export default function RegistrationModal({ onClose }: RegistrationModalProps) {
  return (
    <div
      className={styles.modalBackdrop}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className={`${styles.modal} container`}>
        <div className={styles.modalHeadWrapper}>
          <a href="/" className={styles.logo} aria-label="GO IT — головна">
            <img
              src={"/src/assets/icons/logo-left.svg"}
              alt="GO IT знак"
              className={styles.logoMark}
            />
            <img
              src={"/src/assets/icons/logo-right.svg"}
              alt="GO IT"
              className={styles.logoWordmark}
            />
          </a>
          <button
            type="button"
            className={styles.closeBtn}
            aria-label="Закрити модалку"
            onClick={onClose}
          >
            <img
              src="/src/assets/icons/close-btn.svg"
              alt="Закрити"
              className={styles.closeIcon}
            />
          </button>
        </div>
        <div className={styles.modalContentWrapper}>
          <p className={styles.timerLabel}>Реєструйся просто зараз</p>
          <CountdownTimer targetDate={TARGET_DATE} />
          <RegistrationForm />
        </div>
      </div>
    </div>
  );
}
