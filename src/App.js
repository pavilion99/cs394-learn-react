import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { withStyles } from '@material-ui/core';

const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center'
  }
}

const App = ({ classes }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/products.json").then(result => result.json()).then(res_json => {
      const { products: products_obj } = res_json;
      const products_vals = Object.values(products_obj);
  
      setProducts(products_vals);
    });
  }, []);

  return (
    <div className={classes.container}>
      {products.map(product => (
        <ProductCard key={product.sku} title={product.title} subtitle={product.description} sku={product.sku} price={product.price} />
      ))}
    </div>
  );
};

export default withStyles(styles)(App);
