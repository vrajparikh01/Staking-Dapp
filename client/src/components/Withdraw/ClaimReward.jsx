import { ethers } from "ethers";
import { useState, useContext, useRef } from "react";
import Web3Context from "../../context/Web3Context";

const ClaimReward = ()=>{
    const [txStatus, setTxStatus] = useState("")
    const {stakingContract} = useContext(Web3Context)
    const stakeTokenRef = useRef();
    const claimReward = async(e)=>{
        e.preventDefault()
        try {
            const tx = await stakingContract.claimReward()
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
            console.error("Claim Reward error", error.message)
        }
    }

    return(
        <div>
            {txStatus && <div>{txStatus}</div>}
            <button onClick={claimReward} type="submit">Claim Reward</button>
        </div>
    )
}

export default ClaimReward;