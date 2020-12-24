

function gettx(hash){

    return new Promise((resolve, reject)=>{
        web3.eth.getTransactionReceipt(hash,(error,data)=>{
            console.log('getTransaction')
            if(error){
                reject(error)
            }
            resolve(data)

        })

    })

}

export default  function getTransaction(hash){
  var timeid;
    return new Promise((resolve, reject)=>{
        
        
        timeid=setInterval (async ()=>{
            var data = await gettx(hash);
            if(data&&data.blockNumber!=null){
                clearInterval(timeid);
                resolve(data)
            }

        },1000*10)

    })
    


}