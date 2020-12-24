<template>
  <div>
    <a target="_blank" :href="geturl">{{$t('lambdalink.contract')}}</a>

  </div>
</template>

<script>
import config from '@/config/index.js'
import { mapState } from 'vuex';

export default {
    data() {
        return {
            
        }
    },
    computed: {
        ...mapState(['ethChainID']),
        geturl(){
            if(this.ethChainID==3){
                return config.ethTestUrl+"/token/"+config.tlambContractAddress

            }else{
                return config.ethMainUrl+"/token/"+config.tlambMainContractAddress
            }
        }
    },
}
</script>
<style scoped>
a{
        color: yellow;
 }
</style>