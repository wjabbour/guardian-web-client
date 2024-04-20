import styles from './Catalog.module.scss'
import ClothingIcon from '../../components/ClothingIcon/ClothingIcon'
import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { catalog } from '../../lib/catalog'

export default function Catalog() {
    const navigate = useNavigate();
    const location = useLocation();
    const [available_catalog, set_catalog] = useState([])

    useEffect(() => {
        let inventory = []
        if (location.pathname.includes('womens')) {
            inventory = catalog.filter((item) => item.gender === 'female')
        } else if (location.pathname.includes('accessories')) {
            inventory = catalog.filter((item) => item.gender === 'accessory')
        } else {
          inventory = catalog.filter((item) => item.gender === 'male')
        }

        set_catalog(inventory)
    }, [])

    return (
        <div className={styles.landing}>
            <div className={styles.grid}>
                {
                    available_catalog.map((item) => {
                        return (
                            <div onClick={() => {navigate(`/item/${item.code}`)}} key={item.name}>
                                <ClothingIcon img={`/images/${item.code}.jpg`} label={item.name} />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}