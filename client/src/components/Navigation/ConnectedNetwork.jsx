import { useContext } from "react";
import Web3Context from "../../context/Web3Context";

const ConnectedNetwork = ()=>{
    const {chainId} = useContext(Web3Context)
    if(chainId===80001){
        return <p>Connected Network: Mumbai</p>
    }
    else{
        return <p>Connected Network: Not Supported</p>
    }
}

export default ConnectedNetwork;