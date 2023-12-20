import {ethers, Contract} from 'ethers'
import stakingTokenAbi from '../ABI/stakingTokenAbi.json'
import stakingAbi from '../ABI/stakingAbi.json'

export const connectWallet = async()=>{
    try {
        let [provider, signer, chainId, stakingContract, stakingTokenContract] = [null, null, null, null, null]
        if(window.ethereum===null){
            throw new Error("Please install Metamask")
        }
        const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts'
        })

        // chain id comes in hexadecimal format
        let chainIdHex = await window.ethereum.request({
            method: 'eth_chainId'
        })
        chainId = parseInt(chainIdHex)

        let selectedAccount = accounts[0]
        if(!selectedAccount){
            throw new Error("No account available")
        }

        provider = new ethers.BrowserProvider(window.ethereum)
        signer = provider.getSigner()

        const stakingContractAddress = "0x7C8499627Ea24bb8B6Da6F06533369FeFeC9ca9e"
        const stakingTokenContractAddress = "0xd33af887b2b202b6Df21209DeA10549E7B3e7608"

        stakingContract = new ethers.Contract(stakingContractAddress, stakingAbi, signer)
        stakingTokenContract = new ethers.Contract(stakingTokenContractAddress, stakingTokenAbi, signer)

        return {provider, selectedAccount, chainId, stakingContract, stakingTokenContract}
    } catch (error) {
        console.error(error)
        throw error
    }
}