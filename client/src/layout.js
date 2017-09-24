import Header from './components/header';
import Footer from './components/footer';
import React, {Component} from 'react';
//import {store} from './index';

class Layout extends Component {

  render() {
    return (
      <div>
        <Header />
        {this.props.children}
        <Footer />
      </div>
    )
  }

}

export default Layout;