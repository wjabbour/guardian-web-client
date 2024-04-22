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
      <div className={styles.back__button} onClick={() => { navigate('/') }}>
        <SvgIcon fontSize='inherit'><ArrowBackIcon /></SvgIcon>
      </div>
      <div className={styles.grid}>
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
    </div>
  )
}