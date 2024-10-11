
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import AppRouter from './router/AppRouter.jsx';
import store from './redux/store.js';
import './styles/index.css';

createRoot(document.getElementById('root')).render(
  <Provider store={store} >
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  </Provider>
)
