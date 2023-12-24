import Wallet from './components/Wallet/Wallet'
import './App.css'
import Navigation from './components/Navigation/Navigation'
import DisplayPanel from './components/Display Panel/DisplayPanel'
import TokenApproval from './components/StakeToken/TokenApproval'
import StakeAmount from './components/StakeToken/StakeAmount'
import WithdrawStakeAmount from './components/Withdraw/WithdrawStakeAmount'
import ClaimReward from './components/Withdraw/ClaimReward'
import { StakingProvider } from './context/StakingContext'

function App() {
  return (
    <>
      <Wallet>
        <Navigation />
        <StakingProvider>
          <DisplayPanel />
          <StakeAmount />
          <WithdrawStakeAmount />
        </StakingProvider>
        <TokenApproval />
        <ClaimReward />
      </Wallet>
    </>
  )
}

export default App
