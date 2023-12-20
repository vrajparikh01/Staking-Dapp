import { useState, useEffect } from "react";
import { connectWallet } from "../../utils/connectWallet";
import Web3Context from "../../context/Web3Context";
import {handleAccountChange} from "../../utils/handleAccountChange";
import {handleChainChange} from "../../utils/handleChainChange";

const Wallet = ({children})=>{
    const [state, setState] = useState({
        provider: null,
        account: null,
        chainId: null,
        stakingTokenContract: null,
        stakingContract: null
    })

    const [isLoading, setIsLoading] = useState(false)

    useEffect(()=>{
        window.ethereum.on('accountsChanged', ()=> handleAccountChange(setState))
        window.ethereum.on('chainChanged', ()=> handleChainChange(setState))

        return()=>{
            window.ethereum.removeListener('accountChanged', ()=> handleAccountChange(setState))
            window.ethereum.removeListener('chainChanged', ()=> handleChainChange(setState))
        }
    }, [])

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