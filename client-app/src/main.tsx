// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './app/layout/styles.css'
import App from './app/layout/App.tsx'
import 'react-calendar/dist/Calendar.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-datepicker/dist/react-datepicker.css'
import 'semantic-ui-css/semantic.min.css'
import { store, StoreContext } from './app/stores/stores.ts'
import { Router } from 'react-router-dom'
import {createBrowserHistory} from 'history'

export const history = createBrowserHistory();

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <StoreContext.Provider value={store}>
    <Router history={history}>
        <App />
    </Router>
      
  </StoreContext.Provider>
    
  // </StrictMode>,
)
