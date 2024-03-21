import styles from './Footer.module.scss';

export default function Footer () {
    return (
        <div className={styles.footer}>
            <div className={styles.container}>
                <h1 className={styles.name}>Cannon Motor Company</h1>
            </div>
        </div>
    )
}