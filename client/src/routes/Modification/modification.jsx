import styles from './modification.module.scss'
import { catalog } from '../../lib/catalog'
import { useLoaderData, useOutletContext, useNavigate, useLocation } from 'react-router-dom'
import { useState } from 'react'
import Snackbar from '@mui/material/Snackbar';
import { SvgIcon } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Alert from "@mui/material/Alert";
import { getEmbroidery } from '../../lib/utils';
import { LOGO_PLACEMENTS } from '../../lib/constants';

export async function loader({ params }) {
  const item = catalog.find((i) => i.code === params.id)
  return item;
}

export default function Modification() {
  const item = useLoaderData();
  const navigate = useNavigate();
  const location = useLocation()

  const [cart, set_cart] = useOutletContext();
  const [selected_color, set_selected_color] = useState(item.default_color);
  const [image_source, set_image_source] = useState(`/images/${item.code}_${selected_color.toLowerCase()}.jpg`)
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarText, setSnackbarText] = useState('Item added to cart')
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);
  const [errorSnackbarText, setErrorSnackbarText] = useState('')
  const sizes = Object.keys(item.sizes)
  const halfColors = item.halfColors || []
  const colors = item.colors
  const [selected_size, set_size] = useState(sizes[0])
  const [price, set_price] = useState(item.sizes[selected_size])
  const [embroidery, setEmbroidery] = useState('');
  const [placement, setPlacement] = useState('Left Chest');

  const handleChange = (event) => {
    setEmbroidery(event.target.value);
  };

  const handlePlacementChange = (event) => {
    setPlacement(event.target.value);
  };

  const embroideries = getEmbroidery(item.type).map((e) => {
    return <MenuItem value={e}>{e}</MenuItem>
  })

  const embroiderySelector = <div className={styles.selector}>
    <FormControl fullWidth>
      <InputLabel>Logo</InputLabel>
      <Select
        value={embroidery}
        label="embroidery"
        onChange={handleChange}
      >
        {embroideries}
      </Select>
    </FormControl>
  </div>

  const placements = LOGO_PLACEMENTS().map((l) => {
    return <MenuItem value={l}>{l}</MenuItem>
  })

  const placementSelector = <div className={styles.selector}>
    <FormControl fullWidth>
      <InputLabel>Logo Placement</InputLabel>
      <Select
        value={placement}
        label="placement"
        onChange={handlePlacementChange}
      >
        {placements}
      </Select>
    </FormControl>
  </div>

  function handleSnackbarClose() {
    setSnackbarOpen(false);
    setErrorSnackbarOpen(false)
  }

  const color_selection = item.colors.map((color) => {
    if (halfColors.includes(color)) {
      const primaryColor = color.split(' ')[0]
      return <div className={styles.color__option} key={color}>
        <div
          className={`${styles.color__block} ${styles[primaryColor]}`}
          onClick={() => {
            const selectedColor = color.split(' ').join('_')
            set_selected_color(selectedColor)
            set_image_source(`/images/${item.code}_${selectedColor.toLowerCase()}.jpg`)
          }}>
          <div className={`${styles.color__triangle} `}>
          </div>
        </div>

        <div className={styles.color__name}>
          <p>{color}</p>
        </div>
      </div>
    } else {
      return <div className={styles.color__option} key={color}>
        <div
          className={`${styles.color__block} ${styles[color.split(' ').join('_')]} ${selected_color === color ? styles.selected : ''}`}
          onClick={() => {
            const selectedColor = color.split(' ').join('_')
            set_selected_color(selectedColor)
            set_image_source(`/images/${item.code}_${selectedColor.toLowerCase()}.jpg`)
          }}>
        </div>
        <div className={styles.color__name}>
          <p>{color}</p>
        </div>
      </div>
    }
  })

  function add_item_to_cart() {
    const new_cart = {
      ...cart
    }
    let any_input_has_value = false
    let invalid_input = false

    if (!embroidery) {
      setErrorSnackbarOpen(true)
      setErrorSnackbarText('Must select an embroidery')
      return
    }

    const table = document.getElementById('table')
    for (let i = 1; i < table.rows.length; i++) {
      const inputs = table.rows[i].getElementsByTagName("input")
      for (let j = 0; j < inputs.length; j++) {
        if (inputs[j].value) {
          any_input_has_value = true
          const isNum = /^\d+$/.test(inputs[j].value);
          if (!isNum) {
            inputs[j].value = ""
            continue
          }
          if (item.type === 'accessory' && Number(inputs[j].value) < 12) {
            invalid_input = true
            setErrorSnackbarOpen(true)
            setErrorSnackbarText('Must order at least 12 units')
            continue
          }
          
          const cart_item = {
            type: item.type,
            name: item.fullname,
            price: item.sizes[sizes[i - 1]],
            quantity: Number(inputs[j].value),
            size: sizes[i - 1],
            color: colors[j],
            code: item.code,
            placement: item.type === 'accessory' ? 'N/A' : placement,
            embroidery
          }

          const key = `${item.code},${Object.keys(item.sizes)[i - 1]},${colors[j]},${embroidery}`
          if (new_cart[key]) {
            new_cart[key].quantity += Number(inputs[j].value)
          } else {
            new_cart[key] = cart_item
          }
        }
        inputs[j].value = ""
      }
    }

    if (!any_input_has_value || invalid_input) {

    } else {
      setEmbroidery('')
      set_cart(new_cart)
      sessionStorage.setItem('cart', JSON.stringify(new_cart))
      setSnackbarOpen(true)
    }
  }

  function handleSnackbarClose() {
    setSnackbarOpen(false);
    setErrorSnackbarOpen(false)
  }

  return (
    <div className={styles.container}>
      <div className={styles.back__button} onClick={() => { navigate('/') }}>
        <SvgIcon fontSize='inherit'><ArrowBackIcon /></SvgIcon>
      </div>
      <div className={styles.card}>
        <div className={styles.image__container}>
          <img src={image_source}></img>
        </div>
        <div className={styles.information__panel}>
          <div className={styles.name}>
            {item.fullname}
          </div>
          <div className={styles.price}>Starts at ${price} each</div>
          <div className={styles.color__selector}>
            {color_selection}
          </div>
          {embroiderySelector}
          {item.type !== 'accessory' && placementSelector}
          <div className={styles.form__container}>
            <table id="table">
              <thead>
                <tr>
                  <th scope="col"></th>
                  {item.colors.map((color) => {
                    return <th scope="col">{color}</th>
                  })}
                </tr>
              </thead>
              <tbody>
                {sizes.map((size) => {
                  return <tr>
                    <th scope="row">{size}</th>
                    {item.colors.map(() => {
                      return <td><input type="text"></input></td>
                    })}
                  </tr>
                })}
              </tbody>
            </table>
          </div>

          <div className={styles.checkout__container} onClick={add_item_to_cart}>
            <p>Add To Cart</p>
          </div>
        </div>
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2500}
        message={snackbarText}
        onClose={handleSnackbarClose}
      />
      <Snackbar
        open={errorSnackbarOpen}
        autoHideDuration={2500}
        onClose={handleSnackbarClose}
      >
        <Alert severity="error">{errorSnackbarText}</Alert>
      </Snackbar>
    </div>
  )
}