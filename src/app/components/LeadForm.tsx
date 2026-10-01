"use client";

import { useState, type FormEvent } from "react";
import styles from "./LeadForm.module.css";

type Status = "idle" | "submitting" | "success" | "error";

/**
 * Consultation request form.
 *
 * Submits to a configurable endpoint. While no endpoint is configured the
 * form validates input and shows an honest fallback that routes the visitor
 * to the phone number instead of silently dropping the lead.
 */
const ENDPOINT = process.env.NEXT_PUBLIC_LEAD_ENDPOINT ?? "";

const PHONE_HREF = "tel:+989123456789";

export default function LeadForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    setError("");

    // No endpoint configured — don't pretend the lead was captured.
    if (!ENDPOINT) {
      setStatus("error");
      setError(
        "ثبت آنلاین درخواست در حال حاضر فعال نیست. لطفاً برای مشاوره فوری با ما تماس بگیرید."
      );
      return;
    }

    setStatus("submitting");

    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (!res.ok) throw new Error(`Request failed: ${res.status}`);

      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
      setError(
        "ارسال درخواست با خطا مواجه شد. لطفاً دوباره تلاش کنید یا با ما تماس بگیرید."
      );
    }
  }

  if (status === "success") {
    return (
      <div className={styles.success} role="status">
        <CheckIcon />
        <h3 className={styles.successTitle}>درخواست شما ثبت شد</h3>
        <p className={styles.successText}>
          کارشناسان بازرگانی نقی‌زاده در کوتاه‌ترین زمان با شما تماس خواهند گرفت.
        </p>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate={false}>
      <input
        type="hidden"
        name="_subject"
        value="بازرگانی نقی‌زاده: درخواست جدید مشاوره از سایت"
      />

      <div className={styles.field}>
        <label className={styles.label} htmlFor="fullName">
          نام و نام خانوادگی
          <span className={styles.required} aria-hidden="true">
            *
          </span>
        </label>
        <input
          id="fullName"
          className={styles.input}
          type="text"
          name="fullName"
          required
          autoComplete="name"
          placeholder="مثلاً: محمد رضایی"
          aria-required="true"
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="phone">
          شماره همراه
          <span className={styles.required} aria-hidden="true">
            *
          </span>
        </label>
        <input
          id="phone"
          className={styles.input}
          type="tel"
          name="phone"
          required
          autoComplete="tel"
          inputMode="tel"
          placeholder="مثلاً: ۰۹۱۲۳۴۵۶۷۸۹"
          aria-required="true"
          aria-describedby="phone-hint"
        />
        <p id="phone-hint" className={styles.hint}>
          شماره تماس شما صرفاً برای هماهنگی مشاوره استفاده می‌شود.
        </p>
      </div>

      <button
        type="submit"
        className={styles.submit}
        disabled={status === "submitting"}
      >
        {status === "submitting" ? "در حال ارسال…" : "ثبت درخواست مشاوره"}
      </button>

      {status === "error" && (
        <div className={styles.error} role="alert">
          <p className={styles.errorText}>{error}</p>
          <a href={PHONE_HREF} className={styles.errorLink}>
            تماس تلفنی با کارشناس
          </a>
        </div>
      )}

      <p className={styles.privacy}>
        اطلاعات شما نزد ما محفوظ بوده و صرفاً جهت مشاوره و هماهنگی خرید استفاده
        می‌شود.
      </p>
    </form>
  );
}

function CheckIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={styles.successIcon}
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
