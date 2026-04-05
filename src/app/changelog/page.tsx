import React from 'react';
import Link from 'next/link';
import { versionHistory } from '../../lib/changelog';
import styles from './page.module.css';

export default function ChangelogPage() {
  const versions = versionHistory;

  return (
    <div className={styles.main}>      
      <main className={styles.container}>
        <div className={styles.header}>
          <Link href="/">&larr; Volver al inicio</Link>
          <h1>Actualizaciones de Estrella 3D</h1>
          <p>
            Sigue de cerca cómo va creciendo nuestro ecosistema. El compromiso principal es mantener
            un desarrollo veloz sin fallas en la estructura fundamental.
          </p>
        </div>

        <div className={styles.timeline}>
          {versions.map((ver, index) => (
            <div key={ver.version} className={styles.versionCard}>
              <div className={styles.versionHeader}>
                <div className={styles.badgeWrapper}>
                  <span className={styles.versionBadge}>v{ver.version}</span>
                  {index === 0 && <span className={styles.newBadge}>NUEVA</span>}
                </div>
                <span className={styles.date}>{ver.date}</span>
              </div>
              <h2 className={styles.versionTitle}>{ver.title}</h2>
              <ul className={styles.changelist}>
                {ver.changes.map((change, i) => (
                  <li key={i}>{change}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </main>    </div>
  );
}
