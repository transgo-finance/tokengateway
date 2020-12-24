<template>
  <div class="lambda">
    <div class="table-wrapper">
      <Table :columns="getColum" :loading="loading" :data="data">
        <template slot-scope="{ row, index }" slot="from">
          <a :href="`${ethUrl}/address/${row.from}`" target="_blank">
            {{ row.from.slice(0, 5) }} ... {{ row.from.slice(-5) }}
          </a>
        </template>

        <template slot-scope="{ row }" slot="lambdaAddress">
          <a :href="`${lambUrl}/address/${row.receiver}/activity/1/all`" target="_blank">
            {{ row.receiver.slice(0, 5) }} ... {{ row.receiver.slice(-5) }}
          </a>
        </template>

        <template slot-scope="{ row, index }" slot="amount">
          <span>{{ row.amount && row.amount.amount_withdraw }} tLAMB</span>
        </template>

        <template slot-scope="{ row }" slot="realAmount">
          <span v-if="row.status === 'Confirmed'">
            {{ row.LambGas && row.LambGas.estimate_amount | formatNormalValue }} tLAMB
          </span>
          <span v-else>--</span>
        </template>

        <template slot-scope="{ row, index }" slot="create_time">
          <span>{{ row.deposit_time | formatDate }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="hash">
          <a v-if="row.status === 'Confirmed'" :href="`${lambUrl}/txDetail/${row.withdraw_hash}`" target="_blank">
            {{ row.withdraw_hash.slice(0, 5) }} ... {{ row.withdraw_hash.slice(-5) }}
          </a>
          <span v-else>--</span>
        </template>

        <template slot-scope="{ row, index }" slot="eth_hash">
          <a v-if="row.status === 'Confirmed'" :href="`${ethUrl}/tx/${row.deposit_hash}`" target="_blank">
            {{ row.deposit_hash.slice(0, 5) }} ... {{ row.deposit_hash.slice(-5) }}
          </a>
          <span v-else>--</span>
        </template>

        <template slot-scope="{ row, index }" slot="status">
          <span class="info" v-if="row.status === 'Confirming'">{{ $t('record.s1') }}</span>
          <span class="info" v-if="row.status === 'TodoSend'">{{ $t('record.s2') }}</span>
          <span class="info" v-if="row.status === 'Todo'">{{ $t('record.s3') }}</span>
          <span class="info" v-if="row.status === 'TodoConfirming'">{{ $t('record.s4') }}</span>
          <span class="success" v-if="row.status === 'Confirmed'">{{ $t('record.s5') }}</span>
          <span class="error" v-if="row.status === 'ConfirmFailed'">{{ $t('record.s6') }}</span>
          <span class="error" v-if="row.status === 'InvalidMemo'">{{ $t('record.s7') }}</span>
          <span class="error" v-if="row.status === 'InternalError'">{{ $t('record.s8') }}</span>
          <span class="error" v-if="row.status === 'InvalidTx'">{{ $t('record.s9') }}</span>
          <span class="error" v-if="row.status === 'DepositAmountTooSmall'">{{ $t('record.s10') }}</span>
          <span class="error" v-if="row.status === 'DepositAmountTooLarge'">{{ $t('record.s11') }}</span>
        </template>
      </Table>
    </div>

    <div class="page-wrapper tr" v-if="count > 10">
      <Page :total="count" size="small" @on-change="getCurrentPage" show-elevator />
    </div>
  </div>
</template>

<script>
import config from '@/config/index.js';
import axios from 'axios';
import { mapState } from 'vuex';
export default {
  data() {
    return {
      data: [],
      count: 0,
      pageNum: 1,
      loading: false,
      lambUrl: '',
      ethUrl: '',
    };
  },
  computed: {
    ...mapState(['chainID', 'ethChainID']),
    getColum() {
      const colum = [
        {
          title: 'From',
          slot: 'from',
        },
        {
          title: 'To',
          slot: 'lambdaAddress',
        },
        {
          title: 'Amount',
          slot: 'amount',
        },
        {
          title: this.$t('record.table.t5'),
          slot: 'realAmount',
        },
        {
          title: this.$t('record.table.t1'),
          slot: 'create_time',
        },
        {
          title: this.$t('record.table.t2'),
          slot: 'hash',
        },
        {
          title: this.$t('record.table.t3'),
          slot: 'eth_hash',
        },
        {
          title: this.$t('record.table.t4'),
          slot: 'status',
        },
      ];
      return colum;
    },
  },
  methods: {
    async getTokenData() {
      this.loading = true;
      let param = {
        method: 'get',
        url: config.tokenLambUrl,
        params: {
          from: this.$route.params.ethAddress,
          to: this.$route.params.lambAddress,
          pageNum: this.pageNum,
          showNum: 10,
        },
      };
      try {
        let res = await axios(param);
        this.count = res.data.count;
        this.data = res.data.data;
        this.loading = false;
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },
    getBaseUrl() {
      if (this.chainID.includes('test') && this.ethChainID === 3) {
        this.lambUrl = config.testUrl;
        this.ethUrl = config.ethTestUrl;
      } else if (!this.chainID.includes('test') && this.ethChainID === 1) {
        this.lambUrl = config.mainUrl;
        this.ethUrl = config.ethMainUrl;
      } else {
        this.$Notice.warning({
          title: this.$t('notice.n'),
          desc: this.$t('notice.n26'),
        });
        this.lambUrl = config.testUrl;
        this.ethUrl = config.ethTestUrl;
      }
    },
    getCurrentPage(val) {
      this.pageNum = val;
      this.getTokenData();
    },
  },
  mounted() {
    this.getTokenData();
    let timer = setTimeout(() => {
      this.getBaseUrl();
      clearTimeout(timer);
    }, 1200);
  },
};
</script>

<style lang="less" scoped>
.lambda {
  margin-top: 20px;
  padding-bottom: 100px;
}
</style>