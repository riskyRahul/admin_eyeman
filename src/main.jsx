import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import { Provider } from 'react-redux'
import store from './pages/redux-Toolkit/store.jsx'
import { ToastContainer } from 'react-toastify'
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />

      <ToastContainer
        position="top-center"
        autoClose={3000}
        closeOnClick
        draggable
        theme="colored"
      />
    </Provider>
  </BrowserRouter>
)
