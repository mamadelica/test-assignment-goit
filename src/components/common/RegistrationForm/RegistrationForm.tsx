import React from "react";
import { Formik, Form, Field, ErrorMessage, type FormikErrors } from "formik";
import * as Yup from "yup";
import styles from "./RegistrationForm.module.css";
import type { FormikHelpers } from "formik";

export type RegistrationFormData = {
  name: string;
  email: string;
  phone: string;
  agree: boolean;
};

type RegistrationFormErrors = FormikErrors<RegistrationFormData> & {
  form?: string;
};

type Props = {
  onClose?: () => void;
};

// схема валідації Yup
const validationSchema = Yup.object({
  name: Yup.string().trim().required("Вкажіть імʼя"),
  email: Yup.string()
    .trim()
    .email("Невірний формат email")
    .required("Вкажіть email"),
  phone: Yup.string()
    .trim()
    .matches(/^\+?\d{9,15}$/, "Невірний формат телефону")
    .required("Вкажіть телефон"),
  agree: Yup.boolean().oneOf([true], "Потрібно погодитись з умовами"),
});

export default function RegistrationForm({ onClose }: Props) {
  const initialValues: RegistrationFormData = {
    name: "",
    email: "",
    phone: "",
    agree: false,
  };

  const handleSubmit = async (
    values: RegistrationFormData,
    {
      setSubmitting,
      setErrors,
      resetForm,
    }: FormikHelpers<RegistrationFormData>,
  ) => {
    try {
      const response = await fetch("https://example.com/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Помилка запиту");
      }

      const result = await response.json();
      console.log("Успіх:", result);

      resetForm();
      onClose?.();
    } catch (err) {
      console.error(err);
      setErrors({
        form: "Помилка при відправці. Спробуйте пізніше.",
      } as RegistrationFormErrors);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik<RegistrationFormData>
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, errors, setFieldValue }) => (
        <Form className={styles.form} noValidate aria-labelledby="formHeading">
          {/* Загальна помилка */}
          {(errors as RegistrationFormErrors).form && (
            <div className={styles.formError} role="alert">
              {(errors as RegistrationFormErrors).form}
            </div>
          )}

          {/* name */}
          <div className={styles.field}>
            <label htmlFor="name" className="srOnly">
              Імʼя
            </label>
            <Field
              id="name"
              name="name"
              type="text"
              className={`${styles.input} ${errors.name ? styles.invalid : ""}`}
              placeholder="Введи своє імʼя"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
              required
            />
            <ErrorMessage
              name="name"
              component="div"
              id="name-error"
              className={styles.error}
            />
          </div>

          {/* email */}
          <div className={styles.field}>
            <label htmlFor="email" className="srOnly">
              E‑mail
            </label>
            <Field
              id="email"
              name="email"
              type="email"
              className={`${styles.input} ${errors.email ? styles.invalid : ""}`}
              placeholder="Введи свій E‑mail"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              required
            />
            <ErrorMessage
              name="email"
              component="div"
              id="email-error"
              className={styles.error}
            />
          </div>

          {/* phone */}
          <div className={styles.field}>
            <label htmlFor="phone" className="srOnly">
              Телефон
            </label>
            <div className={styles.inputWrapper}>
              <img
                src="/src/assets/icons/flag.svg"
                alt="UA"
                className={styles.flagIcon}
              />
              <Field
                id="phone"
                name="phone"
                type="tel"
                className={`${styles.input} ${styles.inputPhone} ${errors.phone ? styles.invalid : ""}`}
                placeholder="+380 95 --- -- --"
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? "phone-error" : undefined}
                required
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const cleaned = e.target.value.replace(/[^\d+]/g, "");
                  setFieldValue("phone", cleaned);
                }}
              />
            </div>
            <ErrorMessage
              name="phone"
              component="div"
              id="phone-error"
              className={styles.error}
            />
          </div>

          {/* Чекбокс */}
          <div className={styles.fieldCheckbox}>
            <label className={styles.checkboxWrapper}>
              <Field
                id="agree"
                name="agree"
                type="checkbox"
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
          <ErrorMessage
            name="agree"
            component="div"
            id="agree-error"
            className={styles.error}
          />

          {/* Кнопка */}
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
        </Form>
      )}
    </Formik>
  );
}
