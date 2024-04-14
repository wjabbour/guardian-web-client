import styles from './Footer.module.scss';

export default function Footer () {
    return (
        <div className={styles.footer}>
            <div className={styles.container}>
                <h1 className={styles.name}>Account Reps: Louis Budbill (678-287-1649) & Glenn Rodney (678-287-1608)</h1>
            </div>
        </div>
    )
}