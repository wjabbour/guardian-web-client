import styles from "./Footer.module.scss";
import { getConfigValue } from "../../lib/config";

export default function Footer() {
  const accountReps = getConfigValue("account_reps");
  const accountRepString = accountReps.map((rep) => {
    return `${rep.name} (${rep.phone})`
  }).join(' & ')
  return (
    <div className={styles.footer}>
      <div className={styles.container}>
        <h1 className={styles.name}>Guardian Main Line: 800-727-7222</h1>
        <h1 className={styles.name}>
          Account Reps: {accountRepString}
        </h1>
      </div>
    </div>
  );
}
