import Wallet  from './components/Wallet/Wallet'
import './App.css'
import Navigation from './components/Navigation/Navigation'
import DisplayPanel from './components/Display Panel/DisplayPanel'

function App() {
  return (
    <>
      <Wallet>
        <Navigation/>
        <DisplayPanel/>
      </Wallet>
    </>
  )
}

export default App
