import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from "@/components/theme-provider"
import { SWRConfig } from 'swr'
import axios from 'axios'
import App from './App.tsx'
import './index.css'
import { store } from './store/store'
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
        <SWRConfig value={{
          fetcher: async (url: string) => await axios.get(url).then(res => res.data).catch(error => console.error(error))
        }}>
          <App />
        </SWRConfig>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
)
