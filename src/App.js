import React from 'react';
import './App.scss';
import { ConfigureStore } from './redux/configureStore';
import { Provider } from 'react-redux';
import Main from './components/MainComponent';

const store = ConfigureStore();

class App extends React.Component {

  render(){
    return (
      <Provider store = {store}>
        <Main />
      </Provider>
    );
  }
}

export default App;
