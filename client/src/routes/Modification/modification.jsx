import styles from './modification.module.scss'
import { catalog } from '../../lib/catalog'
import { useLoaderData, useOutletContext } from 'react-router-dom'
import { useState } from 'react'
import QuantityDropDown from '../../components/QuantityDropDown/QuantityDropDown'
import SizeDropDown from '../../components/SizeDropDown/SizeDropDown'
import { addItemToCart } from '../../App'
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Snackbar from '@mui/material/Snackbar';

export async function loader({ params }) {
  const item = catalog.find((i) => i.code === params.id)
  return item;
}

export default function Modification() {
  const item = useLoaderData();
  const [cart, set_cart] = useOutletContext();
  const [selected_color, set_selected_color] = useState(item.default_color);
  const [image_source, set_image_source] = useState(`/images/${item.code}_${selected_color.toLowerCase()}.jpg`)
  const [quantity_one, set_quantity_one] = useState(0);
  const [quantity_two, set_quantity_two] = useState(0);
  const [quantity_three, set_quantity_three] = useState(0);
  const [color_one, set_color_one] = useState('');
  const [color_two, set_color_two] = useState('');
  const [color_three, set_color_three] = useState('');
  const [size_one, set_size_one] = useState('');
  const [size_two, set_size_two] = useState('');
  const [size_three, set_size_three] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarText, setSnackbarText] = useState('Item added to cart')
  const size_selection = Object.keys(item.sizes)
  const [selected_size, set_size] = useState(size_selection[0])
  const [price, set_price] = useState(item.sizes[selected_size])

  const color_selection = item.colors.map((color) => {
    return <div className={styles.color__option} key={color}>
      <div
        className={`${styles.color__block} ${styles[color]} ${selected_color === color ? styles.selected : ''}`}
        onClick={() => {
          set_selected_color(color)
          set_image_source(`/images/${item.code}_${color.toLowerCase()}.jpg`)
        }}>
      </div>
      <div className={styles.color__name}>
        <p>{color}</p>
      </div>
    </div>
  })

  function add_item_to_cart() {
    let item_one, item_two, item_three

    const time = Date.now()
    const new_cart = {
      ...cart
    }
    if (color_one && quantity_one && size_one) {
      item_one = { name: item.fullname, price: item.sizes[size_one], quantity: quantity_one, size: size_one, color: color_one, code: item.code }
      new_cart[time] = item_one
    }

    if (color_two && quantity_two && size_two) {
      item_two = { name: item.fullname, price: item.sizes[size_two], quantity: quantity_two, size: size_two, color: color_two, code: item.code }
      new_cart[time + 1] = item_two
    }

    if (color_three && quantity_three && size_three) {
      item_three = { name: item.fullname, price: item.sizes[size_three], quantity: quantity_three, size: size_three, color: color_three, code: item.code }
      new_cart[time + 2] = item_three
    }

    set_cart(new_cart)
    sessionStorage.setItem('cart', JSON.stringify(new_cart))
    setSnackbarOpen(true)

    set_size_one('')
    set_size_two('')
    set_size_three('')
    set_color_one('')
    set_color_two('')
    set_color_three('')
    set_quantity_one(0)
    set_quantity_two(0)
    set_quantity_three(0)
  }

  function handleSnackbarClose() {
    setSnackbarOpen(false);
  }

  const handle_quantity_one_change = (event) => {
    set_quantity_one(event.target.value);
  };

  const handle_quantity_two_change = (event) => {
    set_quantity_two(event.target.value);
  };

  const handle_quantity_three_change = (event) => {
    set_quantity_three(event.target.value);
  };

  const handle_color_one = (event) => {
    set_color_one(event.target.value);
  };

  const handle_color_two = (event) => {
    set_color_two(event.target.value);
  };

  const handle_color_three = (event) => {
    set_color_three(event.target.value);
  };

  const handle_size_one = (event) => {
    set_size_one(event.target.value);
  };

  const handle_size_two = (event) => {
    set_size_two(event.target.value);
  };

  const handle_size_three = (event) => {
    set_size_three(event.target.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.image__container}>
          <img src={image_source}></img>
        </div>
        <div className={styles.information__panel}>
          <div className={styles.name}>
            {item.fullname}
          </div>
          <div className={styles.price}>${price} each</div>
          {item.restricted &&
            <div className={styles.restriction}>
              Approved for Service and Parts counters only
            </div>
          }
          <div className={styles.color__selector}>
            {color_selection}
          </div>
          <div className={styles.form__container}>
            <div className={styles.form}>
              <FormControl id={styles.move} className={styles.text__field} variant="filled" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel>Quantity</InputLabel>
                <Select
                  value={quantity_one}
                  onChange={handle_quantity_one_change}
                >
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                </Select>
              </FormControl>
              <FormControl id={styles.move} className={styles.text__field} variant="filled" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel>Color</InputLabel>
                <Select
                  id=""
                  value={color_one}
                  onChange={handle_color_one}
                >
                  {item.colors.map((c) => {
                    return <MenuItem value={c}>{c}</MenuItem>
                  })}
                </Select>
              </FormControl>
              <FormControl id={styles.move} className={styles.text__field} variant="filled" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel>Size</InputLabel>
                <Select
                  id=""
                  value={size_one}
                  onChange={handle_size_one}
                >
                  {Object.keys(item.sizes).map((c) => {
                    return <MenuItem value={c}>{c}</MenuItem>
                  })}
                </Select>
              </FormControl>
            </div>

            <div className={styles.form}>
              <FormControl id={styles.move} className={styles.text__field} variant="filled" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel>Quantity</InputLabel>
                <Select
                  value={quantity_two}
                  onChange={handle_quantity_two_change}
                >
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                </Select>
              </FormControl>
              <FormControl id={styles.move} className={styles.text__field} variant="filled" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel>Color</InputLabel>
                <Select
                  id=""
                  value={color_two}
                  onChange={handle_color_two}
                >
                  {item.colors.map((c) => {
                    return <MenuItem value={c}>{c}</MenuItem>
                  })}
                </Select>
              </FormControl>
              <FormControl id={styles.move} className={styles.text__field} variant="filled" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel>Size</InputLabel>
                <Select
                  id=""
                  value={size_two}
                  onChange={handle_size_two}
                >
                  {Object.keys(item.sizes).map((c) => {
                    return <MenuItem value={c}>{c}</MenuItem>
                  })}
                </Select>
              </FormControl>
            </div>

            <div className={styles.form}>
              <FormControl id={styles.move} className={styles.text__field} variant="filled" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel>Quantity</InputLabel>
                <Select
                  value={quantity_three}
                  onChange={handle_quantity_three_change}
                >
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                </Select>
              </FormControl>
              <FormControl id={styles.move} className={styles.text__field} variant="filled" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel>Color</InputLabel>
                <Select
                  id=""
                  value={color_three}
                  onChange={handle_color_three}
                >
                  {item.colors.map((c) => {
                    return <MenuItem value={c}>{c}</MenuItem>
                  })}
                </Select>
              </FormControl>
              <FormControl id={styles.move} className={styles.text__field} variant="filled" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel>Size</InputLabel>
                <Select
                  id=""
                  value={size_three}
                  onChange={handle_size_three}
                >
                  {Object.keys(item.sizes).map((c) => {
                    return <MenuItem value={c}>{c}</MenuItem>
                  })}
                </Select>
              </FormControl>
            </div>
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
    </div>
  )
}