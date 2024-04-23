import styles from './Catalog.module.scss'
import ClothingIcon from '../../components/ClothingIcon/ClothingIcon'
import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { catalog } from '../../lib/catalog'
import { SvgIcon } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function Catalog() {
  const navigate = useNavigate();
  const location = useLocation();
  const [available_catalog, set_catalog] = useState([])
  console.log(available_catalog)

  useEffect(() => {
    let inventory = []
    if (location.pathname.includes('womens')) {
      inventory = catalog.filter((item) => item.type === 'female')
    } else if (location.pathname.includes('hat')) {
      inventory = catalog.filter((item) => item.type === 'hat')
    } else if (location.pathname.includes('accessories')) {
      inventory = catalog.filter((item) => item.type === 'accessory')
    } else {
      inventory = catalog.filter((item) => item.type === 'male')
    }

    set_catalog(inventory)
  }, [])

  return (
    <div className={styles.landing}>
      {location.pathname.includes('accessories') &&
        <div className={styles.minimum}>
          <div className={styles.text__wrapper}>
            <p>Must order at least 12 units</p>
          </div>
        </div>
      }
      <div className={styles.grid}>
        <div className={styles.back__button} onClick={() => { navigate('/') }}>
          <SvgIcon fontSize='inherit'><ArrowBackIcon /></SvgIcon>
        </div>
        {
          available_catalog.map((item) => {
            return (
              <div onClick={() => { navigate(`/item/${item.code}`) }} key={item.name}>
                <ClothingIcon img={`/images/${item.code}.jpg`} label={item.name} />
              </div>
            )
          })
        }

      </div>
      <div className={styles.logo__preview}>
        <div className={styles.title}>
          <p>Available Logos:</p>
        </div>
        
        {location.pathname.includes('accessories') &&
          <div className={styles.logos}>
            <img src={'/images/ford.png'}></img>
            <img src={'/images/hyundai.png'}></img>
            <img className={styles.large__picture} src={'/images/chrysler.png'}></img>
            <img className={styles.large__picture} src={'/images/dodge.png'}></img>
            <img src={'/images/jeep.png'}></img>
            <img src={'/images/ram.png'}></img>
          </div>
        }
        {location.pathname.includes('hats') &&
          <div className={styles.logos}>
            <img className={styles.quicklane} src={'/images/quicklane.png'}></img>
            <img src={'/images/stivers.png'}></img>
            <img src={'/images/ford.png'}></img>
            <img src={'/images/hyundai.png'}></img>
            <img className={styles.large__picture} src={'/images/chrysler.png'}></img>
            <img className={styles.large__picture} src={'/images/dodge.png'}></img>
            <img src={'/images/jeep.png'}></img>
            <img src={'/images/ram.png'}></img>
          </div>
        }
        {location.pathname.includes('mens') &&
          <div className={styles.logos}>
            <img className={styles.quicklane} src={'/images/quicklane.png'}></img>
            <img src={'/images/stivers.png'}></img>
          </div>
        }


      </div>
    </div>
  )
}