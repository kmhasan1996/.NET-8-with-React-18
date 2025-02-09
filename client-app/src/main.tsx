// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './app/layout/styles.css'
import App from './app/layout/App.tsx'
import 'semantic-ui-css/semantic.min.css'
import { store, StoreContext } from './app/stores/stores.ts'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <StoreContext.Provider value={store}>
    <BrowserRouter>
        <App />
    </BrowserRouter>
      
  </StoreContext.Provider>
    
  // </StrictMode>,
)
