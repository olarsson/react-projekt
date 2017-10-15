import Header from './header';
import Footer from './footer';
import React, {Component} from 'react';

class Body extends Component {

  render() {
    return (
      <main>
        <Header {...this.props} />
        {this.props.children}
        <Footer />
      </main>
    )
  }

}

export default Body;