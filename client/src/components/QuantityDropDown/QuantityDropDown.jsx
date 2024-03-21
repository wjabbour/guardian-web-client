import styles from './QuantityDropDown.module.scss'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useState, useEffect } from 'react'

export default function QuantityDropDown(props) {
    const [is_hidden, set_hidden] = useState(true)

    useEffect(() => {
        function clickListener (e) {
            if (e.target.className.includes('quantity__container') && is_hidden) {
                set_hidden(false)
            } else {
                set_hidden(true)
            }
        }

        window.addEventListener('click', clickListener)

        return () => {
            window.removeEventListener('click', clickListener)
        }
    })

    return (
        <div className={styles.quantity__container}>
            <p className={styles.quantity}>Qty:</p>
            <p className={styles.count}>{props.quantity}</p>
            <ArrowDropDownIcon />

            <div className={`${styles.selection} ${is_hidden ? styles.hidden : ''}`}>
                <div className={styles.option} onClick={() => props.set_quantity(1)}>
                    <p>1</p>
                </div>
                <div className={styles.option} onClick={() => props.set_quantity(2)}>
                    <p>2</p>
                </div>
                <div className={styles.option} onClick={() => props.set_quantity(3)}>
                    <p>3</p>
                </div>
                <div className={styles.option} onClick={() => props.set_quantity(4)}>
                    <p>4</p>
                </div>
            </div>
        </div>
    )
}