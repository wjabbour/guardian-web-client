import styles from './Catalog.module.scss'
import ClothingIcon from '../../components/ClothingIcon/ClothingIcon'
import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { catalog } from '../../lib/catalog'
import { SvgIcon } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getEmbroidery } from '../../lib/utils'

export default function Catalog() {
  const navigate = useNavigate();
  const location = useLocation();
  const [available_catalog, set_catalog] = useState([])

  const logos = getEmbroidery(location.pathname.split('/')[2]).map((l) => {
    l = l.toLowerCase()
    if (l === 'chrysler' || l === 'dodge') {
      return <img className={styles.large__picture} src={`/images/${l}.png`}></img>
    } else if (l === 'quicklane') {
      return <img className={styles.quicklane} src={`/images/${l}.png`}></img>
    } else {
      return <img src={`/images/${l}.png`}></img>
    }
  })
  console.log(logos)
  const logosDiv = <div className={styles.logos}>
    {logos}
    {/* <img src={'/images/ford.png'}></img>
    <img src={'/images/hyundai.png'}></img>
    <img className={styles.large__picture} src={'/images/chrysler.png'}></img>
    <img className={styles.large__picture} src={'/images/dodge.png'}></img>
    <img src={'/images/jeep.png'}></img>
    <img src={'/images/ram.png'}></img> */}
  </div>
  useEffect(() => {
    let inventory = []
    console.log(location.pathname)
    if (location.pathname === '/catalog/womens') {
      inventory = catalog.filter((item) => item.type === 'womens')
    } else if (location.pathname === '/catalog/hats') {
      inventory = catalog.filter((item) => item.type === 'hat')
    } else if (location.pathname === '/catalog/accessory') {
      inventory = catalog.filter((item) => item.type === 'accessory')
    } else {
      inventory = catalog.filter((item) => item.type === 'mens')
    }

    set_catalog(inventory)
  }, [])

  return (
    <div className={styles.landing}>
      {location.pathname.includes('accessories') &&
        <div className={styles.text__wrapper}>
          <p>Must order at least 12 units</p>
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
        {logosDiv}
      </div>
    </div>
  )
}