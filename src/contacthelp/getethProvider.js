import { getNetwork } from '@ethersproject/networks'
import { getDefaultProvider } from '@ethersproject/providers'

export default function(Tokencoin){
    //https://eth-mainnet.alchemyapi.io/v2/_-mMjxdfTD-C6NBe24iwXsLFelLocsei
    if(Tokencoin.chainId==1){
        //https://eth-mainnet.alchemyapi.io/v2/_-mMjxdfTD-C6NBe24iwXsLFelLocsei
        //https://eth-mainnet.alchemyapi.io/v2/_-mMjxdfTD-C6NBe24iwXsLFelLocsei
       return  getDefaultProvider(getNetwork(Tokencoin.chainId),{
       alchemy:'_-mMjxdfTD-C6NBe24iwXsLFelLocsei',
       etherscan:'717YNHIQ7RSXPDYJ823QK34NXTKVZW33J1',
    //    infura:{
    //     projectId:'9a211ba3375a44af9d920594ec49e4a5', 
    //     projectSecret:'f2b6bbaa7b3349e091e2784c272b875f'
    //    }
    })
    }else{
        //https://eth-ropsten.alchemyapi.io/v2/EfE4GgSS1wdCAGanz3uOt3SiBA0g4m9R
        return  getDefaultProvider(getNetwork(Tokencoin.chainId),{
        alchemy:'EfE4GgSS1wdCAGanz3uOt3SiBA0g4m9R',
        etherscan:'717YNHIQ7RSXPDYJ823QK34NXTKVZW33J1',
        // infura:{
        //     projectId:'1e578c69998749d1b5d6e0814a82c634', 
        //     projectSecret:'0b5d3b1a1cf847e883de0f92bbe62419'
        //    }

        })
    }
    
}
