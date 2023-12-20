export const handleChainChange = async(setState)=>{
    const chainIdHex = await window.ethereum.request({
        method: 'eth_chainId'
    })
    const chainId = parseInt(chainIdHex)
    console.log(chainId)
    setState(prevState=>({...prevState, chainId}))
}