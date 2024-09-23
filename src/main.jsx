
import { createRoot } from 'react-dom/client'
import './index.css';
import AppRouter from './router/AppRouter.jsx';
import { Provider } from 'react-redux';
import store from './redux/store.js';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <AppRouter />
  </Provider>
)
