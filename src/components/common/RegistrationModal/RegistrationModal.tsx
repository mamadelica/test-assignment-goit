import React from "react";
import styles from "./RegistrationModal.module.css";
import CountdownTimer from "../CountdownTimer/CountdownTimer";
import RegistrationForm from "../RegistrationForm/RegistrationForm";

type RegistrationModalProps = {
  onClose: () => void;
};

export default function RegistrationModal({ onClose }: RegistrationModalProps) {
  return (
    <div className={styles.modalBackdrop}>
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
          <CountdownTimer targetDate="2026-05-10T19:30:00Z" />
          <RegistrationForm />
        </div>
      </div>
    </div>
  );
}
