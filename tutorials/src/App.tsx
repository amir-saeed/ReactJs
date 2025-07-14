import './App.css'
import { StyledEngineProvider } from '@mui/material/styles';
import Layout from './theme/Layout';

function App() {
  return (
    <>
      <StyledEngineProvider injectFirst>
        <Layout />
      </StyledEngineProvider>
    </>
  )
}

export default App
