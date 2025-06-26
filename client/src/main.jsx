import { createRoot } from 'react-dom/client'
import authStore from './store/store.js'
import App from './App.jsx'
import { createContext } from 'react'

const store = new authStore()

export const Context = createContext({
  store
})

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <Context.Provider value={{
      store
    }}>
    <App />
    </Context.Provider>
    
  // </StrictMode>
)
