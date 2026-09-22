import Link from "next/link";

export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--color-surface)",
        borderTop: "1px solid var(--color-border)",
        padding: "48px 0",
        marginTop: "80px",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "32px",
          flexWrap: "wrap",
        }}
      >
        <div>
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              marginBottom: "8px",
              color: "var(--color-text)",
            }}
          >
            بازرگانی نقی‌زاده
          </h2>
          <p className="text-muted" style={{ fontSize: "0.9rem" }}>
            مرجع تخصصی خرید، فروش و واردات انواع خودروهای سنگین و کشنده در ایران.
          </p>
        </div>

        <div style={{ display: "flex", gap: "40px", flexWrap: "wrap" }}>
          <div>
            <h3
              style={{
                fontSize: "0.85rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "var(--color-accent)",
                marginBottom: "12px",
              }}
            >
              دسته‌بندی‌ها
            </h3>
            <ul
              style={{
                listStyle: "none",
                display: "flex",
                flexDirection: "column",
                gap: "6px",
                fontSize: "0.9rem",
              }}
            >
              <li>
                <Link href="/trucks" style={{ color: "var(--color-muted)" }}>
                  کامیون و کشنده
                </Link>
              </li>
              <li>
                <Link
                  href="/construction"
                  style={{ color: "var(--color-muted)" }}
                >
                  ماشین‌آلات راه‌سازی و کشاورزی
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3
              style={{
                fontSize: "0.85rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "var(--color-accent)",
                marginBottom: "12px",
              }}
            >
              تماس با ما
            </h3>
            <p
              style={{
                fontSize: "0.9rem",
                color: "var(--color-muted)",
                lineHeight: 1.6,
              }}
            >
              تلفن: <span style={{ color: "var(--color-text)" }}>۰۹۱۲۳۴۵۶۷۸۹</span>
              <br />
              ایمیل:{" "}
              <Link
                href="mailto:info@flodesk.ir"
                style={{ color: "var(--color-accent)" }}
              >
                info@flodesk.ir
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div
        className="container text-center text-muted"
        style={{
          paddingTop: "24px",
          fontSize: "0.8rem",
          borderTop: "1px solid var(--color-border)",
        }}
      >
        تمامی حقوق مادی و معنوی برای بازرگانی نقی‌زاده محفوظ است. {new Date().getFullYear()}
      </div>
    </footer>
  );
}
