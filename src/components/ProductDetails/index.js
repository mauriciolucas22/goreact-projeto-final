import React, { Component, Fragment } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions as DatabaseActions } from '../../store/ducks/database';

// local styles
import { Container, Content, Details } from './styles';

// global Components
import Header from '../Header';

class ProductDetails extends Component {
  componentWillMount() {
    this.props.getProduct(this.props.match.params.id);
  }

  render() {
    const { productSelected } = this.props.database;
    return (
      <Container>
        <Header />
        { this.props.loading ? <p>loading</p> : (
          <Content>
            { productSelected && (
              <Fragment>
                <img src={productSelected.image} alt={productSelected.brand} />
                <Details>
                  <strong>{productSelected.name}</strong>
                  <small>{productSelected.brand}</small>
                  <p>R$ {productSelected.price}</p>
                  <button type="button" onClick={() => {}}>Adicionar ao carrinho</button>
                </Details>
              </Fragment>
            ) }
          </Content>
        ) }
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  database: state.database,
});

const mapDispatchToProps = dispatch => bindActionCreators(DatabaseActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
