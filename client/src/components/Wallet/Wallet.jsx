import { useState, useEffect } from "react";
import { connectWallet } from "../../utils/connectWallet";
import Web3Context from "../../context/Web3Context";

const Wallet = ({children})=>{
    const [state, setState] = useState({
        provider: null,
        account: null,
        chainId: null,
        stakingTokenContract: null,
        stakingContract: null
    })

    const [isLoading, setIsLoading] = useState(false)

    const handleWallet = async()=>{
        try {
            setIsLoading(true)

            const {provider, selectedAccount, chainId,stakingContract, stakingTokenContract} = await connectWallet();

            console.log(provider, selectedAccount, chainId,stakingContract, stakingTokenContract)

            setState({provider, selectedAccount, chainId,stakingContract, stakingTokenContract})
            
        } catch (error) {
            console.error("Error connecting wallet...", error.message)
        }
        finally{
            setIsLoading(false)
        }
    }
    return (
    <div>
        <Web3Context.Provider value={state}>
           {children}
        </Web3Context.Provider>
        {isLoading? <p>Loading...</p> : null}
    <button onClick={handleWallet}>Connect Wallet</button>
    </div>
    )
}

export default Wallet