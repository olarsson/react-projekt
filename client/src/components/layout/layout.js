import Header from './header';
import Footer from './footer';
import React, {Component} from 'react';
//import {store} from './index';

class Layout extends Component {

  render() {
    return (
      <div>
        <Header {...this.props} />
        {this.props.children}
        <Footer />
      </div>
    )
  }

}

export default Layout;