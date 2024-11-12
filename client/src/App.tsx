import { Provider } from 'react-redux'
import { ThemeProvider } from './components/theme-provider'
import MainPage from './pages/MainPage'
import { store } from './store/store'

function App() {

  return (
    <Provider store={store}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className='dark:bg-zinc-900 h-full min-h-screen'>
          <MainPage />
        </div>
      </ThemeProvider>
    </Provider>
  )
}

export default App