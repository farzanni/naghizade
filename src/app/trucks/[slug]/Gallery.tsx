"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./Gallery.module.css";

/* ════════════════════════════════════════════════════════════
   Gallery — main image with clickable thumbnails.
   Keyboard: arrow keys move between images.
   ════════════════════════════════════════════════════════════ */

export default function Gallery({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  const [active, setActive] = useState(0);

  if (images.length === 0) {
    return <div className={styles.placeholder} aria-hidden="true" />;
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setActive((i) => (i + 1) % images.length);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setActive((i) => (i - 1 + images.length) % images.length);
    }
  };

  return (
    <div className={styles.gallery}>
      <div
        className={styles.stage}
        tabIndex={0}
        role="group"
        aria-label={`تصاویر ${name}`}
        onKeyDown={onKeyDown}
      >
        <Image
          key={images[active]}
          src={images[active]}
          alt={`${name} — تصویر ${active + 1} از ${images.length}`}
          fill
          sizes="(max-width: 1024px) 100vw, 60vw"
          className={styles.stageImg}
          priority
        />

        {images.length > 1 && (
          <p className={styles.counter} aria-live="polite">
            {active + 1} / {images.length}
          </p>
        )}
      </div>

      {images.length > 1 && (
        <ul className={styles.thumbs} role="list">
          {images.map((img, i) => (
            <li key={img}>
              <button
                type="button"
                className={`${styles.thumb} ${
                  i === active ? styles.thumbActive : ""
                }`}
                onClick={() => setActive(i)}
                aria-label={`نمایش تصویر ${i + 1}`}
                aria-current={i === active}
              >
                <Image
                  src={img}
                  alt=""
                  fill
                  sizes="120px"
                  className={styles.thumbImg}
                />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
