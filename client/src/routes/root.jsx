import '../App.css';
import { Outlet, useNavigation } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import { useState } from 'react'

export default function Root() {
  const navigation = useNavigation();
  const [cart, set_cart] = useState(rehydrate())
  function rehydrate () {
    if (sessionStorage.getItem('cart')) {
      return JSON.parse(sessionStorage.getItem('cart'))
    }
    return {}
  }

  return (
    <div className='app'>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={navigation.state === 'loading'}
      />
      <div className={`spinner ${navigation.state === 'loading' ? '' : 'hidden'}`} >
        <Box sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, display: `${navigation.state === 'loading' ? '' : 'none'}` }}>
          <CircularProgress />
        </Box>
      </div>
      <Navbar cart={cart} />
      <Outlet context={[ cart, set_cart] } />
      <Footer />
    </div>
  );
}