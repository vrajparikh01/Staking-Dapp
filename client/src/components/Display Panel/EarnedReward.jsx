import { useContext, useState, useEffect } from "react";
import Web3Context from "../../context/Web3Context";
import { ethers } from "ethers";

const EarnedReward = ()=>{
    const {stakingContract, selectedAccount} = useContext(Web3Context)
    const [earnedAmount, setEarnedAmount] = useState("0")

    useEffect(()=>{
        const fetchEarnedAmount = async()=>{
            try {
                const earnedAmtWei = await stakingContract.earned(selectedAccount)
                const earnedAmt = ethers.formatUnits(earnedAmtWei.toString(),18)
                const roundedAmt = parseFloat(earnedAmt).toFixed(2)
                setEarnedAmount(roundedAmt)
            } catch (error) {
                console.error("Error fetching staked amount",error.message)
            }
        }
        const interval = setInterval(() => {
            stakingContract && fetchEarnedAmount()
        }, 20000);
        return () => clearInterval(interval);
        
    }, [stakingContract, selectedAccount])

    return(
        <p>Earned Amount: {earnedAmount}</p>
    )
}

export default EarnedReward;