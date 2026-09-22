const FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_FORMSPREE_ID";

export default function LeadForm() {
  return (
    <form
      action={FORMSPREE_ENDPOINT}
      method="POST"
      style={{
        background: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-md)",
        padding: "32px",
        boxShadow: "var(--shadow-card)",
      }}
    >
      <input type="hidden" name="_subject" value="بازرگانی نقی‌زاده: درخواست جدید مشاوره از سایت" />
      <input type="hidden" name="_captcha" value="false" />

      <div style={{ marginBottom: "16px" }}>
        <label
          style={{
            display: "block",
            fontSize: "0.9rem",
            fontWeight: 500,
            marginBottom: "6px",
            color: "var(--color-text)",
          }}
          htmlFor="fullName"
        >
          نام و نام خانوادگی *
        </label>
        <input id="fullName" type="text" name="fullName" required placeholder="مثلاً: محمد رضایی" />
      </div>

      <div style={{ marginBottom: "24px" }}>
        <label
          style={{
            display: "block",
            fontSize: "0.9rem",
            fontWeight: 500,
            marginBottom: "6px",
            color: "var(--color-text)",
          }}
          htmlFor="phone"
        >
          شماره همراه *
        </label>
        <input
          id="phone"
          type="tel"
          name="phone"
          required
          placeholder="مثلاً: ۰۹۱۲۳۴۵۶۷۸۹"
          pattern="[0-9۰-۹]{11}"
        />
      </div>

      <button
        type="submit"
        className="btn btn-primary"
        style={{ width: "100%", fontSize: "1.05rem", padding: "14px" }}
      >
        ثبت درخواست مشاوره
      </button>

      <p className="text-muted" style={{ fontSize: "0.8rem", marginTop: "12px" }}>
        اطلاعات شما نزد ما محفوظ بوده و صرفاً جهت مشاوره و هماهنگی خرید استفاده می‌شود.
      </p>
    </form>
  );
}
