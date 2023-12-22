import Wallet  from './components/Wallet/Wallet'
import './App.css'
import Navigation from './components/Navigation/Navigation'
import DisplayPanel from './components/Display Panel/DisplayPanel'
import TokenApproval from './components/StakeToken/TokenApproval'
import StakeAmount from './components/StakeToken/StakeAmount'
import WithdrawStakeAmount from './components/Withdraw/WithdrawStakeAmount'
import ClaimReward from './components/Withdraw/ClaimReward'

function App() {
  return (
    <>
      <Wallet>
        <Navigation/>
        <DisplayPanel/>
        <TokenApproval/>
        <StakeAmount/>
        <WithdrawStakeAmount/>
        <ClaimReward/>
      </Wallet>
    </>
  )
}

export default App
