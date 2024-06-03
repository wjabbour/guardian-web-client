import styles from './landing.module.scss'
import ClothingIcon from '../../components/ClothingIcon/ClothingIcon'

export default function Landing() {
    return (
        <div className={styles.landing}>
            <div className={styles.catalog}>
                <ClothingIcon img={'/images/J317_black.jpg'} label={`Men's Apparel`} link={'/catalog/mens'} no_space={true}/>
                <ClothingIcon img={'/images/L317_black.jpg'} label={`Women's Apparel`} link={'/catalog/womens'} no_space={true} />
                {/* <ClothingIcon img={'/images/C112_black.jpg'} label={`Hats`} link={'/catalog/hats'} no_space={false}/> */}
                <ClothingIcon img={'/images/04032_black.jpg'} label={`Mugs & Keychains`} link={'/catalog/accessory'} no_space={false}/>
            </div>
        </div>
    )
}