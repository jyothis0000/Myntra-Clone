import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header/Header';
import Profile from './components/Profile/Profile';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Order from './components/Order/order';
import OrderProduct from './components/Order/OrderProduct';
import OrderDetails from './components/Order/OrderDetails';
import Slick from './components/Slick/Customers';
import Gallery from './components/Gallery/Gallery';
import Filter from './components/Filter/Filter';
import Wish from './components/Wishlist/Wishlist';
import Update from './components/update/update';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Footer from './components/Footer/Footer';
import CartHeader from './components/Header/CartHeader';
import Address from './components/Address/Address';
import {BrowserRouter as Router,Route } from 'react-router-dom';
import ProductPage from './components/ProductPage/ProductPage';
import CardPage from './components/CartPage/Cart';

class App extends Component {
  render() {
    return (
      <Router>
        {(window.location.pathname === '/cart' || window.location.pathname === '/wish' || window.location.pathname === '/cart/order/id' || window.location.pathname === '/cart/order/detail/id' || window.location.pathname === '/cart/address' || window.location.pathname === '/cart/order')?<CartHeader /> :<Header />}
        <Route exact path="/" component={Slick} />        
        <Route exact path="/wish" component={Wish} />
        <Route exact path="/mens-t-shirt" component={Filter} />
        <Route exact path="/mens-t-shirt/:code" component={ProductPage} />
        <Route exact path="/cart" component={CardPage} />
        <Route exact path="/cart/address" component={Address} />
        <Route exact path="/cart/order/:id" component={OrderProduct} />
        <Route exact path="/cart/order/detail/:id" component={OrderDetails} />
        <Route exact path="/cart/order" component={Order} />
        <Route exact path="/" component={Gallery} />
        <Route exact path="/update" component={Update} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route path="/" component={Footer} />
      </Router>
    );
  }
}

export default App;
