import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from "@/components/theme-provider"
import { SWRConfig } from 'swr'
import axios from 'axios'
import App from '@/App.tsx'
import '@/index.css'
import { store } from '@/store/store'
import { Provider } from 'react-redux'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import SearchHomePage from './pages/searchHomePage'

// * Disable console logs in prod
if (process.env.NODE_ENV === 'production') {
  console.log = () => { }
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: '/Search',
    element: <SearchHomePage />
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
        <SWRConfig value={{
          // * Simplified: async (url: string) => await axios.get(url).then(res => res.data).catch(error => console.error(error))
          fetcher: async (url: string) => await axios.get(url).then(res => res.data).catch(error => console.error(error))
        }}>
          <RouterProvider router={router} />
        </SWRConfig>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
)
