import styles from './success.module.scss'
import { useNavigate, useLocation } from 'react-router-dom'
import { SvgIcon } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function Success() {
    const navigate = useNavigate()
    const location = useLocation()
    const cart = location.state.cart
    const cart_keys = Object.keys(cart)

    return (
        <div className={styles.container}>
            <div className={styles.back__button} onClick={() => { navigate('/') }}>
                <SvgIcon fontSize='inherit'><ArrowBackIcon /></SvgIcon>
            </div>
            <div className={styles.card}>
                <div className={styles.title}>
                    <h1>Order Successfully Placed</h1>
                </div>
                <div className={styles.scrollable}>
                    {
                        cart_keys.map((k) => {
                            return (
                                <div key={k} className={styles.line__item}>
                                    <div className={styles.image__container}>
                                        <img className={`${['1240', '2240', '1640'].includes(cart[k].code) ? styles.small : ''}`} src={`/images/${cart[k].code}_${cart[k].color.split(' ').join('_').toLowerCase()}.jpg`}></img>
                                    </div>
                                    <div className={styles.information__panel}>
                                        <div className={styles.name}>
                                            {cart[k].name}
                                        </div>
                                        <div className={styles.price}>${cart[k].price} each</div>
                                        <div className={styles.color__title}>Color: {cart[k].color}</div>
                                        {cart[k].embroidery &&
                                            <div className={styles.color__title}>Embroidery: {cart[k].embroidery}</div>

                                        }
                                        {cart[k].logo &&
                                            <div className={styles.color__title}>Logo: {cart[k].logo}</div>

                                        }
                                        <div className={styles.size}>
                                            Size: {cart[k].size}
                                        </div>
                                        <div className={styles.quantity}>
                                            Quantity: {cart[k].quantity}
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}