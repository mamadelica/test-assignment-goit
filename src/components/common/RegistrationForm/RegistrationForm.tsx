import React, { useRef, useState } from "react";
import styles from "./RegistrationForm.module.css";

export type RegistrationFormData = {
  name: string;
  email: string;
  phone: string;
  agree: boolean;
};

type Props = {
  onSubmit?: (data: RegistrationFormData) => Promise<void> | void;
  /** Якщо форма в модалці — можна передати callback для закриття */
  onClose?: () => void;
};

export default function RegistrationForm({ onSubmit, onClose }: Props) {
  // контролювані поля
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(""); // зберігаємо тільки цифри/формат
  const [agree, setAgree] = useState(false);

  // стан валідації/відправки
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // реф на перше поле для фокусу при відкритті модалки
  const nameRef = useRef<HTMLInputElement | null>(null);

  // прості валідатори
  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Вкажіть імʼя";
    if (!email.trim()) e.email = "Вкажіть email";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      e.email = "Невірний формат email";
    if (!phone.trim()) e.phone = "Вкажіть телефон";
    else if (!/^\+?\d{9,15}$/.test(phone.replace(/\s+/g, "")))
      e.phone = "Невірний формат телефону";
    if (!agree) e.agree = "Потрібно погодитись з умовами";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // обробник submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    if (!validate()) return;

    const payload: RegistrationFormData = {
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      agree,
    };

    try {
      setIsSubmitting(true);
      // викликаємо зовнішній onSubmit якщо передано
      await onSubmit?.(payload);
      // після успіху можна очистити форму або закрити модалку
      setName("");
      setEmail("");
      setPhone("");
      setAgree(false);
      setErrors({});
      onClose?.();
    } catch (err) {
      console.error(err);
      setErrors({ form: "Помилка при відправці. Спробуйте пізніше." });
    } finally {
      setIsSubmitting(false);
    }
  };

  // просте форматування телефону (опціонально)
  const handlePhoneChange = (value: string) => {
    // залишаємо тільки цифри та плюс
    const cleaned = value.replace(/[^\d+]/g, "");
    setPhone(cleaned);
  };

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit}
      noValidate
      aria-labelledby="formHeading"
    >
      {/* загальна помилка */}
      {errors.form && (
        <div className={styles.formError} role="alert">
          {errors.form}
        </div>
      )}

      <div className={styles.field}>
        <label htmlFor="name" className={"srOnly"}>
          Імʼя
        </label>
        <input
          id="name"
          ref={nameRef}
          className={`${styles.input} ${errors.name ? styles.invalid : ""}`}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Введи своє імʼя"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
          required
        />
        {errors.name && (
          <div id="name-error" className={styles.error}>
            {errors.name}
          </div>
        )}
      </div>

      <div className={styles.field}>
        <label htmlFor="email" className={"srOnly"}>
          E‑mail
        </label>
        <input
          id="email"
          className={`${styles.input} ${errors.email ? styles.invalid : ""}`}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Введи свій E‑mail"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
          required
        />
        {errors.email && (
          <div id="email-error" className={styles.error}>
            {errors.email}
          </div>
        )}
      </div>

      <div className={styles.field}>
        <label htmlFor="phone" className={"srOnly"}>
          Телефон
        </label>
        <div className={styles.inputWrapper}>
          <img
            src="/src/assets/icons/flag.svg"
            alt="UA"
            className={styles.flagIcon}
          />
          <input
            id="phone"
            className={`${styles.input} ${styles.inputPhone} ${errors.phone ? styles.invalid : ""}`}
            type="tel"
            value={phone}
            onChange={(e) => handlePhoneChange(e.target.value)}
            placeholder="+380 95 --- -- --"
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            required
          />
        </div>
        {errors.phone && (
          <div id="phone-error" className={styles.error}>
            {errors.phone}
          </div>
        )}
      </div>

      <div className={styles.fieldCheckbox}>
        <label className={styles.checkboxWrapper}>
          <input
            id="agree"
            type="checkbox"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
            className={styles.checkbox}
          />
          <span className={styles.customCheckbox}>
            <img
              src="/src/assets/icons/checkboxBorder.svg"
              alt=""
              className={styles.checkboxBorder}
            />
            <img
              src="/src/assets/icons/checkboxChecked.svg"
              alt=""
              className={styles.checkboxChecked}
            />
          </span>
        </label>

        <span className={styles.checkboxText}>
          Я згоден з{" "}
          <a href="#" target="_blank" rel="noopener noreferrer">
            Політика конфіденційності
          </a>{" "}
          та{" "}
          <a href="#" target="_blank" rel="noopener noreferrer">
            Умови користування
          </a>
        </span>
      </div>

      {errors.agree && (
        <div id="agree-error" className={styles.error}>
          {errors.agree}
        </div>
      )}

      <div className={styles.actions}>
        <button
          type="submit"
          className={styles.submitBtn}
          disabled={isSubmitting}
          aria-disabled={isSubmitting}
        >
          {isSubmitting ? "Відправка..." : "Зареєструватися"}
        </button>
      </div>
    </form>
  );
}
