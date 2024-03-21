import styles from './SizeDropDown.module.scss'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useState, useEffect } from 'react'

export default function SizeDropDown(props) {
    const [is_hidden, set_hidden] = useState(true)

    useEffect(() => {
        function clickListener(e) {
            if (e.target.className.includes('size__container') && is_hidden) {
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
        <div className={styles.size__container}>
            <p className={styles.size}>Size:</p>
            <p className={styles.count}>{props.size}</p>
            <div className={styles.icon__container}><ArrowDropDownIcon /></div>
            
            <div className={`${styles.selection} ${is_hidden ? styles.hidden : ''}`}>
                {
                    props.sizes.map((s) => {
                        return <div className={styles.option} key={s} onClick={() => props.update_size_and_price(s)}>
                            <p>{s}</p>
                        </div>
                    })
                }
            </div>
        </div>
    )
}