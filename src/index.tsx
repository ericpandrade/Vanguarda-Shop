import ReactDOM from 'react-dom/client';

import Router from './routes';

import reportWebVitals from './reportWebVitals';

import "react-toastify/dist/ReactToastify.css";
import "antd/dist/antd.min.css";
import './global.css'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
    <Router />
);

reportWebVitals();
