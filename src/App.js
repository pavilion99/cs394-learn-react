import React, { useEffect, useState } from 'react';
import ProductCard, { priceFormat } from './ProductCard';
import { withStyles, Drawer, Fab, Typography, AppBar, Toolbar, IconButton, Button } from '@material-ui/core';
import { ShoppingCart as ShoppingCartIcon, AccountCircle } from '@material-ui/icons';
import ProductListing from './ProductListing';
import firebase from 'firebase';

const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 64
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
  },
  title: {
    flexGrow: 1
  },
  welcomeText: {
    marginRight: 10
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

const authProvider = new firebase.auth.GoogleAuthProvider();

const db = firebase.database();

const App = ({ classes }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [inventory, setInventory] = useState({inventory: {}});
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/products.json").then(result => result.json()).then(res_json => {
      const { products: products_obj } = res_json;
      const products_vals = Object.values(products_obj);
  
      setProducts(products_vals);
    });
  }, []);

  useEffect(() => {

  }, []);

  useEffect(() => {
    db.ref('inventory/').on('value', res => {
      setInventory({inventory: res.val()});
    });
  }, []);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      setUser(user);
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

  const handleLoginClick = () => {
    if (user != null) {
      firebase.auth().signOut();
    } else {
      firebase.auth().signInWithPopup(authProvider).then(result => {
        setUser(result.user);
      }).catch(err => {
        // no-op
        console.log(err);
      });
    }
  };

  const total = products.length === 0 ? 0 : cart.map(sku => products.filter(product => product.sku === sku[0])[0].price).reduce((t, n) => (t + n), 0);

  return (
    <div className={classes.container}>
      <AppBar>
        <Toolbar>
          <Typography className={classes.title} color="inherit" variant="h6">
            Store
          </Typography>
          <Typography variant="subtitle1" color="inherit" className={classes.welcomeText}>
            {user === null ? "" : "Welcome back, " + user.email}
          </Typography>
          <Button variant="text" color="inherit" onClick={handleLoginClick}>
            <AccountCircle />
            {user === null ? "Log in with Google" : "Log out"}
          </Button>
        </Toolbar>
      </AppBar>
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
