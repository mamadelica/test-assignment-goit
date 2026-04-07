import styles from "./RegistrationSection.module.css";
import CountdownTimer from "../../common/CountdownTimer/CountdownTimer";
import RegistrationForm from "../../common/RegistrationForm/RegistrationForm";
import RegistrationModal from "../../common/RegistrationModal/RegistrationModal";
import { useState } from "react";
import BackgroundDecor from "../../ui/BackgroundDecor/BackgroundDecor";
import { TARGET_DATE } from "../../../constants/dateTime.ts";

export default function RegistrationSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section
      className={styles.registrationSection}
      aria-labelledby="registrationTitle"
    >
      {/* Декоративний фон */}
      <BackgroundDecor />

      <div className="container">
        <a href="/" className={styles.logo} aria-label="GO IT — головна">
          <img
            src={"/assets/icons/logo-left.svg"}
            alt="GO IT знак"
            className={styles.logoMark}
          />
          <img
            src={"/assets/icons/logo-right.svg"}
            alt="GO IT"
            className={styles.logoWordmark}
          />
        </a>

        <div
          className={styles.layoutWrapper}
          role="region"
          aria-label="Вебінар та реєстрація"
        >
          <div className={styles.webinarInfoWrapper}>
            <div className={styles.webinarMetaWrapper}>
              <p className={styles.webinarMeta}>
                {" "}
                <span></span>
                Безоплатний вебінар
              </p>
              <p className={styles.webinarMeta}>
                {" "}
                <span></span>
                Старт: <time className={styles.eventTime}>10 січня, 19:30</time>
              </p>
            </div>

            <h1 id="registrationTitle" className={styles.mainTitle}>
              Навчіться створювати Excel-таблиці на pro-рівні
            </h1>

            <p className={styles.description}>
              Опануйте функціонал Microsoft Excel, автоматизуйте свою роботу та
              створюйте таблиці швидко і в задоволення
            </p>
          </div>

          <div className={styles.formWrapper} aria-labelledby="formHeading">
            <img
              src="/assets/icons/arrow.svg"
              alt=""
              className={styles.arrow}
            />
            <h2 id="formHeading" className={"srOnly"}>
              Форма реєстрації
            </h2>

            <p className={styles.timerLabel}>Реєструйся просто зараз</p>

            <CountdownTimer targetDate={TARGET_DATE} />

            <div
              className={`${styles.formCard} ${styles.desktopVisible}`}
              aria-hidden={false}
            >
              <RegistrationForm />
            </div>

            <div className={styles.mobileActions}>
              <button
                type="button"
                className={styles.primaryBtn}
                aria-haspopup="dialog"
                aria-controls="registrationModal"
                onClick={() => setIsModalOpen(true)}
              >
                Зареєструватися
              </button>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <RegistrationModal onClose={() => setIsModalOpen(false)} />
      )}
    </section>
  );
}
