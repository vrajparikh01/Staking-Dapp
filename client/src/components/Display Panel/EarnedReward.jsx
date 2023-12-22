import { useContext, useState, useEffect } from "react";
import Web3Context from "../../context/Web3Context";
import { ethers } from "ethers";

const EarnedReward = ()=>{
    const {stakingContract, selectedAccount} = useContext(Web3Context)
    const [earnedAmount, setEarnedAmount] = useState("0")

    useEffect(()=>{
        const fetchEarnedAmount = async()=>{
            try {
                console.log(stakingContract, "contract")
                const earnedAmtWei = await stakingContract.earned(selectedAccount)
                const earnedAmt = ethers.formatUnits(earnedAmtWei.toString(),18)
                setEarnedAmount(earnedAmt)
            } catch (error) {
                console.error("Error fetching staked amount",error.message)
            }
        }
        stakingContract && fetchEarnedAmount()
    }, [stakingContract, selectedAccount])

    return(
        <p>Earned Amount: {earnedAmount}</p>
    )
}

export default EarnedReward;