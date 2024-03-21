import styles from './landing.module.scss'
import ClothingIcon from '../../components/ClothingIcon/ClothingIcon'

export default function Landing() {
    return (
        <div className={styles.landing}>
            <div className={styles.row}>
                <ClothingIcon img={'/images/F218_black.jpg'} label={`Men's Apparel`} link={'/catalog/mens'} no_space={true}/>
                <ClothingIcon img={'/images/L407_black.jpg'} label={`Women's Apparel`} link={'/catalog/womens'} no_space={true} />
                <ClothingIcon img={'/images/TM1MY394_black.jpg'} label={`Accessories`} link={'/catalog/accessories'} no_space={true}/>
            </div>
        </div>
    )
}