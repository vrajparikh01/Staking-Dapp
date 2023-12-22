import { ethers } from "ethers";
import { useState, useContext, useRef } from "react";
import Web3Context from "../../context/Web3Context";

const TokenApproval = ()=>{
    const [txStatus, setTxStatus] = useState("")
    const {stakingContract, stakingTokenContract} = useContext(Web3Context)
    const approveTokenRef = useRef();
    const approveToken = async(e)=>{
        e.preventDefault()
        const amount = approveTokenRef.current.value.trim();
        if(isNaN(amount) || amount<=0){
            console.error("Please enter a valid amount");
            return;
        }
        const amountToSend = ethers.parseUnits(amount, 18).toString()
        console.log(amountToSend)
        try {
            const tx = await stakingTokenContract.approve(stakingContract.target, amountToSend)
            console.log(tx)
            setTxStatus("Tx pending...")
            const receipt = await tx.wait();
            if(receipt.status===1){
                setTxStatus("Transaction confirmed!");
                setTimeout(() => {
                    setTxStatus("")
                }, 5000);
                approveTokenRef.current.value=""
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
            <form onSubmit={approveToken}>
                <label>Token Approval: </label>
                <input type="text" ref={approveTokenRef}></input>
                <button onClick={approveToken} type="submit">Token Approve</button>
            </form>
        </div>
    )
}

export default TokenApproval;