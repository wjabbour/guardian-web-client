import styles from './cart.module.scss'
import { useOutletContext, useNavigate } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete';
import { calculate_item_count, calculate_item_price } from '../../lib/utils';
import { SvgIcon } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function Cart() {
  const navigate = useNavigate()
  const [cart, set_cart] = useOutletContext();
  const cart_keys = Object.keys(cart)

  return (
    <div className={styles.container}>
      <div className={styles.back__button} onClick={() => { navigate('/') }}>
        <SvgIcon fontSize='inherit'><ArrowBackIcon /></SvgIcon>
      </div>
      <div className={styles.card}>
        {Object.keys(cart).length === 0 &&
          <div className={styles.no__items}>
            You haven't added any items to your cart yet.
          </div>
        }
        <div className={styles.scrollable}>
          {
            cart_keys.map((k) => {
              return (
                <div key={k} className={styles.line__item}>
                  <div className={styles.image__container}>
                    <img src={`/images/${cart[k].code}_${cart[k].color.split(' ').join('_').toLowerCase()}.jpg`}></img>
                  </div>
                  <div className={styles.information__panel}>
                    <div className={styles.name}>
                      {cart[k].name}
                    </div>
                    <div className={styles.price}>${cart[k].price} each</div>
                    <div className={styles.color__title}>Color: {cart[k].color}</div>
                    <div className={styles.color__title}>Embroidery: {cart[k].embroidery}</div>
                    <div className={styles.size}>
                      Size: {cart[k].size}
                    </div>
                    <div className={styles.quantity}>
                      Quantity: {cart[k].quantity}
                    </div>

                    <DeleteIcon style={{ color: '#C70000' }} onClick={() => {
                      delete cart[k]
                      sessionStorage.setItem('cart', JSON.stringify(cart))
                      set_cart({ ...cart })
                    }} />

                  </div>
                </div>
              )
            })
          }


        </div>
        <div className={styles.subtotal__container}>
          <div className={styles.info}>
            <div className={styles.subtotal}>
              Subtotal ({calculate_item_count(cart)} items): ${calculate_item_price(cart)}
            </div>
            <div className={styles.checkout__container} onClick={() => navigate('/checkout')}>
              <p>Proceed to checkout</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}