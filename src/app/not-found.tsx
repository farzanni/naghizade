import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <section className={styles.page}>
      <div className="container">
        <div className={styles.inner}>
          <p className={styles.code}>۴۰۴</p>
          <h1 className={styles.title}>صفحه مورد نظر پیدا نشد</h1>
          <p className={styles.text}>
            ممکن است این آدرس تغییر کرده باشد یا خودروی مورد نظر از موجودی خارج
            شده باشد. از مسیرهای زیر ادامه دهید یا با کارشناسان ما تماس بگیرید.
          </p>
          <div className={styles.actions}>
            <Link href="/" className="btn btnPrimary">
              بازگشت به صفحه اصلی
            </Link>
            <Link href="/trucks" className="btn btnGhost">
              مشاهده موجودی انبار
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
