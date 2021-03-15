<template>

    <v-row>
        <v-col cols=12 md=6 sm=12>
            <v-card class="px-5 py-5" elevation=3>
                <v-text-field type="number" min="0" :max="balance" v-model="stakeCount" :label="`Max ${balance}`">
                </v-text-field>
                <v-btn block elevation=0 @click="stake" :disabled="$v.stakeCount.$invalid">
                    <span>Stake </span>
                    <span class="mr-2" v-if="stakeCount > 0"> {{stakeCount}} SVX</span>
                </v-btn>
            </v-card>
            <div class="mt-5 ml-5">
                <div class="grey--text">Staked {{stakedBalance}} SVX</div>
                <div class="grey--text" v-if="discount >= 5">Discount {{discount}}%</div>
            </div>

        </v-col>
        <v-col cols=12 md=6 sm=12>
            <v-card class="px-5 py-5" elevation=3>
                <v-text-field type="number" min="0" :max="stakedBalance" v-model="unstakeCount"
                    :label="`Max ${stakedBalance}`"></v-text-field>
                <v-btn block elevation=0 @click="unstake" :disabled="$v.stakeCount.$invalid">
                    <span>Unstake </span>
                    <span class="mr-2" v-if="unstakeCount > 0"> {{unstakeCount}} SVX</span>
                </v-btn>
            </v-card>


            <div class="grey--text mt-5 ml-5">
                Stake 777k+ SVX for automatic node payouts
            </div>
        </v-col>
    </v-row>

</template>


<script>
    import { mapState } from 'vuex'
    import { required, between } from "vuelidate/lib/validators"

    import discountMixin from './mixins/discount'
    export default {
        mixins: [discountMixin],
        data: () => ({
            stakeCount: 0,
            unstakeCount: 0,
            balance: 0,
            stakedBalance: 0,

            polling: null,
        }),
        computed: {
            ...mapState({
                eos: state => state.blockchain.eos,
                scatter: state => state.blockchain.scatter,
            }),
        },
        watch: {
            scatter(val) {
                if (val) this.getBalance()
            },
        },
        validations() {
            return {
                stakeCount: {
                    required,
                    between: between(1, parseFloat(this.balance)),
                },
                unstakeCount: {
                    required,
                    between: between(1, parseFloat(this.stakedBalance)),
                }
            }
        },
        mounted() {
            // this.getBalance()
            this.polling = setInterval(() => {
                this.getBalance()
                this.getFeeDiscount() // from mixin
            }, 1000)
        },
        methods: {
            stake() {
                if (confirm(`Stake ${this.stakeCount} SVX?`))
                    this.eos.transaction({
                        actions: [{
                            account: 'svxmintofeos',
                            name: 'stake',
                            authorization: [{
                                actor: this.scatter.name,
                                permission: "active"
                            }],
                            data: {
                                "account": this.scatter.name,
                                "value": this.$options.filters.eosAmountFormat(this.stakeCount)
                            }

                        }]
                    })
                        .then(() => {
                            this.$notice.success(`Staked ${this.stakeCount} SVX`)
                            this.getBalance() // reload data
                            this.clear()
                        })
                        .catch(error => {
                            console.error('[stake | stake]', error)
                            this.$notice.error('Stake error')
                        })
            },
            unstake() {
                if (confirm(`Un-Stake ${this.unstakeCount} SVX?`))
                    this.eos.transaction({
                        actions: [{
                            account: 'svxmintofeos',
                            name: 'unstake',
                            authorization: [{
                                actor: this.scatter.name,
                                permission: "active"
                            }],
                            data: {
                                "account": this.scatter.name,
                                "value": this.$options.filters.eosAmountFormat(this.unstakeCount)
                            }
                        }]
                    })
                        .then(() => {
                            this.$notice.success(`Unstaked ${this.unstakeCount} SVX`)
                            this.getBalance() // reload data
                            this.clear()
                        })
                        .catch(error => {
                            console.error('[stake | unstake]', error)
                            this.$notice.error('Unstake error')
                        })
            },
            getBalance() {
                this.eos.getTableRows({
                    "json": "true",
                    "code": "svxmintofeos",
                    "scope": this.scatter.name,
                    "table": "accounts"
                }).then(res => {
                    const userBalance = parseFloat(res.rows[0].balance)
                    const storeBalance = parseFloat(res.rows[0].storebalance)

                    this.balance = Math.round(userBalance - storeBalance)
                    this.stakedBalance = Math.round(storeBalance)

                })

            },
            clear() {
                this.stakeCount = 0
                this.unstakeCount = 0
            }

        },
        beforeDestroy() {
            if (this.polling) clearInterval(this.polling)
        },
    }
</script>