import { ethers } from "ethers";
import { useState, useContext, useRef } from "react";
import Web3Context from "../../context/Web3Context";

const StakeAmount = ()=>{
    const [txStatus, setTxStatus] = useState("")
    const {stakingContract} = useContext(Web3Context)
    const stakeTokenRef = useRef();
    const stakeToken = async(e)=>{
        e.preventDefault()
        const amount = stakeTokenRef.current.value.trim();
        if(isNaN(amount) || amount<=0){
            console.error("Please enter a valid amount");
            return;
        }
        const amountToSend = ethers.parseUnits(amount, 18).toString()
        console.log(amountToSend)
        try {
            const tx = await stakingContract.stake(amountToSend)
            console.log(tx)
            setTxStatus("Tx pending...")
            const receipt = await tx.wait();
            if(receipt.status===1){
                setTxStatus("Transaction confirmed!");
                setTimeout(() => {
                    setTxStatus("")
                }, 5000);
                stakeTokenRef.current.value=""
            }
            else{
                setTxStatus("Transaction failed!")
            }
        } catch (error) {
            console.error("Token Approval error", error.message)
        }
    }

    return(
        <div>
            {txStatus && <div>{txStatus}</div>}
            <form onSubmit={stakeToken}>
                <label>Amt to stake: </label>
                <input type="text" ref={stakeTokenRef}></input>
                <button onClick={stakeToken} type="submit">Stake</button>
            </form>
        </div>
    )
}

export default StakeAmount;