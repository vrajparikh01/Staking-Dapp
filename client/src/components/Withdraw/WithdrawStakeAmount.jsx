import { ethers } from "ethers";
import { useState, useContext, useRef } from "react";
import Web3Context from "../../context/Web3Context";
import StakingContext from "../../context/StakingContext";

const WithdrawStakeAmount = ()=>{
    const [txStatus, setTxStatus] = useState("")
    const {stakingContract} = useContext(Web3Context)
    const {isReload, setIsReload} = useContext(StakingContext)
    const withdrawTokenRef = useRef();
    const withdrawToken = async(e)=>{
        e.preventDefault()
        const amount = withdrawTokenRef.current.value.trim();
        if(isNaN(amount) || amount<=0){
            console.error("Please enter a valid amount");
            return;
        }
        const amountToSend = ethers.parseUnits(amount, 18).toString()
        console.log(amountToSend)
        try {
            const tx = await stakingContract.withdraw(amountToSend)
            console.log(tx)
            setTxStatus("Tx pending...")
            const receipt = await tx.wait();
            if(receipt.status===1){
                setTxStatus("Transaction confirmed!");
                setIsReload(!isReload);
                setTimeout(() => {
                    setTxStatus("")
                }, 5000);
                withdrawTokenRef.current.value=""
            }
            else{
                setTxStatus("Transaction failed!")
            }
        } catch (error) {
            console.error("Staked Token withdrawal error", error.message)
        }
    }

    return(
        <div>
            {txStatus && <div>{txStatus}</div>}
            <form onSubmit={withdrawToken}>
                <label>Amt to withdraw: </label>
                <input type="text" ref={withdrawTokenRef}></input>
                <button onClick={withdrawToken} type="submit">Withdraw</button>
            </form>
        </div>
    )
}

export default WithdrawStakeAmount;