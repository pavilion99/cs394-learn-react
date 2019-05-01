import React, { useEffect, useState } from 'react';
import ProductCard, { priceFormat } from './ProductCard';
import { withStyles, Drawer, Fab, Typography } from '@material-ui/core';
import { ShoppingCart as ShoppingCartIcon } from '@material-ui/icons';
import ProductListing from './ProductListing';
import firebase from 'firebase';

const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  carticon: {
    position: 'fixed',
    right: 35, 
    bottom: 35
  },
  cart: {
    paddingTop: 20,
    minWidth: 400
  },
  totalcontainer: {
    marginTop: 10,
    textAlign: 'right',
    paddingRight: 18
  }
}

firebase.initializeApp({
  apiKey: "AIzaSyBQfTv3Ky3_6yYPJjMDmpvZ80hjX0JqH78",
  authDomain: "cs394-learn-react.firebaseapp.com",
  databaseURL: "https://cs394-learn-react.firebaseio.com",
  projectId: "cs394-learn-react",
  storageBucket: "cs394-learn-react.appspot.com",
  messagingSenderId: "220327685707"
});

const db = firebase.database();

const App = ({ classes }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [inventory, setInventory] = useState({inventory: {}});

  useEffect(() => {
    fetch("/products.json").then(result => result.json()).then(res_json => {
      const { products: products_obj } = res_json;
      const products_vals = Object.values(products_obj);
  
      setProducts(products_vals);
    });
  }, []);

  // useEffect(() => {
  //   fetch("/inventory.json").then(result => result.json()).then(res_json => {
  //     setInventory(res_json);
  //   });
  // }, []);

  useEffect(() => {
    db.ref('inventory/').on('value', res => {
      setInventory({inventory: res.val()});
    });
  }, []);

  const addToCart = (sku, size, ts) => {
    setCart([...cart, [sku, size, ts]]);
    toggleCart();
  };

  const toggleCart = () => {
    setCartOpen(!cartOpen);
  }

  const removeFromCart = ts => {
    setCart(cart.filter(item => item[2] !== ts));
  }

  const total = products.length === 0 ? 0 : cart.map(sku => products.filter(product => product.sku === sku[0])[0].price).reduce((t, n) => (t + n), 0);

  return (
    <div className={classes.container}>
      <Drawer className={classes.cart} open={cartOpen} onClose={toggleCart} anchor="right">
        <div className={classes.cart}>
          {cart.map(item => <ProductListing key={item[2]} ts={item[2]} sku={item[0]} products={products} size={item[1]} remove={removeFromCart} />)}
        </div>
        <div className={classes.totalcontainer}>
          <Typography variant="subtitle2">
            Total: &nbsp;
            {priceFormat(total)}
          </Typography>
        </div>
      </Drawer>
      {products.map(product => (
        <ProductCard inCart={cart.filter(item => item[0] === product.sku)} key={product.sku} title={product.title} subtitle={product.description} sku={product.sku} price={product.price} add={addToCart} inventory={inventory.inventory[product.sku + ""]} />
      ))}
      <Fab className={classes.carticon} color="primary" onClick={toggleCart}>
        <ShoppingCartIcon />
      </Fab>
    </div>
  );
};

export default withStyles(styles)(App);
