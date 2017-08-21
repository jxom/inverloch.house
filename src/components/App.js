import { Component } from 'react';
import PropTypes from 'prop-types';

class App extends Component {
  render() {
    const { children } = this.props;
    return children;
  }
}

App.propTypes = {
  children: PropTypes.node.isRequired
};

export default App;
