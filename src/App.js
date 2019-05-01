import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { withStyles, Drawer, Fab } from '@material-ui/core';
import { ShoppingCart as ShoppingCartIcon } from '@material-ui/icons';

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

  const addToCart = product => {
    setCart([...cart, product]);
  };

  const toggleCart = () => {
    setCartOpen(!cartOpen);
  }

  return (
    <div className={classes.container}>
      <Drawer open={cartOpen} onClose={setCartOpen.bind(null, false)} anchor="right">
        
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
