import styles from './Navbar.module.scss';
import { useNavigate } from 'react-router-dom';

export default function Navbar(props) {
  const navigate = useNavigate();

  return (
    <div className={styles.navbar}>
      <div className={`${styles.container} ${styles.orders__container}`} onClick={() => navigate('/orders')}>
        <div className={styles.cart}>View Orders</div>
      </div>
      <div className={`${styles.container} ${styles.cart__container}`} onClick={() => navigate('/cart')}>
        <div className={styles.cart}>Cart ({Object.keys(props.cart).length})</div>
      </div>
      <div className={styles.guardian}>
        <img className={styles.logo} src={'/images/guardian.png'} onClick={() => navigate('/')}></img>
      </div>
      <div className={styles.stivers}>
        <img className={styles.logo} src={'/images/stivers.png'} onClick={() => navigate('/')}></img>
      </div>
    </div>
  )
}