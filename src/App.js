import React from 'react';
import './App.css';

class App extends React.Component {
  state = {
    products: []
  }

  componentDidMount() {
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

    return (
      <div className="App">
        {products.map(product => (
          <div key={product.sku}>{product.title}</div>
        ))}
      </div>
    );
  }
}

export default App;
