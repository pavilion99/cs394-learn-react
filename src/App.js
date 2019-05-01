import React, { useEffect, useState } from 'react';
import ProductCard, { priceFormat } from './ProductCard';
import { withStyles, Drawer, Fab, Typography } from '@material-ui/core';
import { ShoppingCart as ShoppingCartIcon } from '@material-ui/icons';
import ProductListing from './ProductListing';

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

const App = ({ classes }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    fetch("/products.json").then(result => result.json()).then(res_json => {
      const { products: products_obj } = res_json;
      const products_vals = Object.values(products_obj);
  
      setProducts(products_vals);
    });
  }, []);

  const addToCart = (sku, size) => {
    setCart([...cart, [sku, size]]);
    toggleCart();
  };

  const toggleCart = () => {
    setCartOpen(!cartOpen);
  }

  const total = products.length === 0 ? 0 : cart.map(sku => products.filter(product => product.sku === sku[0])[0].price).reduce((t, n) => (t + n), 0);

  return (
    <div className={classes.container}>
      <Drawer className={classes.cart} open={cartOpen} onClose={toggleCart} anchor="right">
        <div className={classes.cart}>
          {cart.map((item, i) => <ProductListing key={i} sku={item[0]} products={products} size={item[1]} />)}
        </div>
        <div className={classes.totalcontainer}>
          <Typography variant="subtitle2">
            Total: &nbsp;
            {priceFormat(total)}
          </Typography>
        </div>
      </Drawer>
      {products.map(product => (
        <ProductCard key={product.sku} title={product.title} subtitle={product.description} sku={product.sku} price={product.price} add={addToCart} />
      ))}
      <Fab className={classes.carticon} color="primary" onClick={toggleCart}>
        <ShoppingCartIcon />
      </Fab>
    </div>
  );
};

export default withStyles(styles)(App);
