import styles from './landing.module.scss'
import ClothingIcon from '../../components/ClothingIcon/ClothingIcon'

export default function Landing() {
    return (
        <div className={styles.landing}>
            <div className={styles.catalog}>
                <ClothingIcon img={'/images/J317_black.jpg'} label={`Men's Apparel`} link={'/catalog/mens'} no_space={true}/>
                <ClothingIcon img={'/images/L317_black.jpg'} label={`Women's Apparel`} link={'/catalog/womens'} no_space={true} />
                <ClothingIcon img={'/images/C112_black.jpg'} label={`Accessories`} link={'/catalog/accessories'} no_space={true}/>
                <ClothingIcon img={'/images/C112_black.jpg'} label={`Mugs & Keychains`} link={'/catalog/accessories'} no_space={true}/>
            </div>

            <div className={styles.logo__preview}>
                <div className={styles.title}>
                    <p>Available Logos:</p>
                </div>
                <img src={'/images/ford.png'}></img>
                <img src={'/images/hyundai.png'}></img>
                <img src={'/images/chrysler.png'}></img>
                <img src={'/images/dodge.png'}></img>
                <img src={'/images/jeep.png'}></img>
                <img src={'/images/ram.png'}></img>
            </div>
        </div>
    )
}