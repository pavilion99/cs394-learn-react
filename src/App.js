import React from 'react';
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

class App extends React.Component {
  state = {
    products: []
  }

  componentDidMount(npm) {
    this.mounted = true;

    fetch("/products.json").then(result => result.json()).then(res_json => {
      if (!this.mounted) return;

      const { products: products_obj } = res_json;
      const products = Object.values(products_obj);

      this.setState({
        products: products
      });
    });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    const { products } = this.state;
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        {products.map(product => (
          <ProductCard key={product.sku} title={product.title} subtitle={product.description} sku={product.sku} price={product.price} />
        ))}
      </div>
    );
  }
}

export default withStyles(styles)(App);
