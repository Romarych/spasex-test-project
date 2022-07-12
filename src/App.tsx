import { Grid } from '@material-ui/core'
import { FC } from 'react'
import { ToastContainer } from 'react-toastify'
import { Header } from './components/Header/Header'
import { Sidebar } from './components/Sidebar/Sidebar'
import 'react-toastify/dist/ReactToastify.css'
import { Rotes } from './components/Rotes/Rotes'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './redux/store'

export const App: FC = () => {
  return <HashRouter>
    <Provider store={store}>
      <ToastContainer />
      <Header />
      <Grid container >
        <Sidebar />
        <Rotes />
      </Grid>
    </Provider>
  </HashRouter>
}



