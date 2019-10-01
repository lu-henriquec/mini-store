import React, { Component } from 'react';
// import {  } from 'prop-types';
import { connect } from 'react-redux';

import { MdAddShoppingCart } from 'react-icons/md';
import { formatPrice } from '../../util/format';
import api from '../../services/api';

import { ProductList } from './styles';

class Home extends Component {
  state = {
    products: [],
  };

  async componentDidMount() {
    const response = await api.get('products');

    const data = response.data.map(prod => ({
      ...prod,
      priceFormatted: formatPrice(prod.price),
    }));

    this.setState({ products: data });
  }

  handleAddProduct = product => {
    const { dispatch } = this.props;
    dispatch({
      type: 'ADD_TO_CART',
      product,
    });
  };

  render() {
    const { products } = this.state;

    return (
      <ProductList>
        {products.map(prod => (
          <li key={prod.id}>
            <img src={prod.image} alt={prod.title} />
            <strong>{prod.title}</strong>
            <span>{prod.priceFormatted}</span>

            <button type='button' onClick={() => this.handleAddProduct(prod)}>
              <div>
                <MdAddShoppingCart sixe={16} color="#FFF" /> 3
              </div>

              <span>Adicionar ao carrinho</span>
            </button>
          </li>
        ))}
      </ProductList>
    );
  }
}

export default connect()(Home);
