"use client";

import { useEffect, useRef } from "react";

/* ════════════════════════════════════════════════════════════
   Client-side error reporting.

   Static site, no server to ping, so errors are POSTed to the same
   Formspree endpoint as leads, with a [خطا] subject prefix so they
   are distinguishable in the inbox.

   Guarded to production, de-duplicated per session and rate-limited,
   so a broken page cannot spam the inbox.

   This is user-enabled monitoring (opted in at launch), not
   background telemetry.
   ════════════════════════════════════════════════════════════ */

const ENDPOINT = process.env.NEXT_PUBLIC_LEAD_ENDPOINT;

/** Minimum milliseconds between two reports. */
const MIN_INTERVAL_MS = 5000;
/** Max reports per page load, as a hard backstop. */
const MAX_REPORTS = 10;

export default function ErrorReporter() {
  const lastSent = useRef(0);
  const sent = useRef(0);

  useEffect(() => {
    if (process.env.NODE_ENV !== "production" || !ENDPOINT) return;

    const report = (message: string, extra: Record<string, string> = {}) => {
      // Rate limit: too soon, or too many already.
      const now = Date.now();
      if (now - lastSent.current < MIN_INTERVAL_MS) return;
      if (sent.current >= MAX_REPORTS) return;
      lastSent.current = now;
      sent.current += 1;

      const data = new FormData();
      data.set("_subject", `خطا در سایت: ${message.slice(0, 60)}`);
      data.set("message", message);
      data.set("url", location.href);
      data.set("userAgent", navigator.userAgent);
      for (const [k, v] of Object.entries(extra)) data.set(k, v);

      // sendBeacon survives page unload; fall back to fetch.
      try {
        const blob = new Blob([data as unknown as BlobPart], {
          type: "multipart/form-data",
        });
        if (!navigator.sendBeacon(ENDPOINT, blob)) {
          fetch(ENDPOINT, { method: "POST", body: data }).catch(() => {});
        }
      } catch {
        /* never let error reporting break the page */
      }
    };

    const seen = new Set<string>();
    const deduped = (key: string, message: string, extra?: Record<string, string>) => {
      if (seen.has(key)) return;
      seen.add(key);
      report(message, extra);
    };

    const onException = (e: ErrorEvent) => {
      deduped(`${e.message}:${e.lineno}`, e.message || "Script error", {
        filename: e.filename,
        lineno: String(e.lineno ?? ""),
        colno: String(e.colno ?? ""),
      });
    };

    const onRejection = (e: PromiseRejectionEvent) => {
      const reason = e.reason;
      const message =
        reason instanceof Error ? reason.message : String(reason ?? "Unhandled rejection");
      deduped(`rejection:${message}`, message);
    };

    // Capture phase so resource-load errors (img/script/…) are caught too.
    const onResourceError = (e: Event) => {
      const el = e.target as HTMLElement | null;
      const src = el?.getAttribute("src") || el?.getAttribute("href");
      if (src) deduped(`resource:${src}`, `Failed to load: ${src}`);
    };

    window.addEventListener("error", onException, true);
    window.addEventListener("error", onResourceError, true);
    window.addEventListener("unhandledrejection", onRejection);

    return () => {
      window.removeEventListener("error", onException, true);
      window.removeEventListener("error", onResourceError, true);
      window.removeEventListener("unhandledrejection", onRejection);
    };
  }, []);

  return null;
}
