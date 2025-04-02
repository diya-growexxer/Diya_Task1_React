import React from 'react';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import { store } from './store/store';
import ProductList from './components/ProductList';

function App() {
  return (
    <Provider store={store}>
      <ConfigProvider>
        <div className="App">
          <h1 style={{ textAlign: 'center', margin: '24px 0' }}>Product Management System</h1>
          <ProductList />
        </div>
      </ConfigProvider>
    </Provider>
  );
}

export default App; 