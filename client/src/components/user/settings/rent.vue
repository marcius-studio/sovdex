<template>
    <div>
        <v-text-field  type="number" min="0" v-model="quantity" label="SOV quantity"> </v-text-field>
        <div class="d-flex justify-space-between">
            <v-btn @click="submit('Rent CPU')"  :disabled="$v.quantity.$invalid" elevation=0 small> Rent CPU </v-btn>
            <v-btn  @click="submit('Rent NET')" :disabled="$v.quantity.$invalid" elevation=0 small> Rent CPU </v-btn>
            <v-btn   @click="submit('Buy RAM')" :disabled="$v.quantity.$invalid" elevation=0 small> Buy RAM </v-btn>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import { required, between } from "vuelidate/lib/validators"

    export default {
        data: () => ({
            quantity: 0
        }),
        computed: mapState({
            eos: state => state.blockchain.eos,
            scatter: state => state.blockchain.scatter,
        }),
        validations() {
            return {
                quantity: {
                    required,
                    between: between(1, 7770000),
                },
            }
        },
        methods: {
            submit(operation) {
                if (confirm(`${operation} with ${this.quantity} SOV?`))
                    this.eos.transaction({
                        actions: [{
                            account: 'sovmintofeos',
                            name: 'transfer',
                            authorization: [{
                                actor: this.scatter.name,
                                permission: "active"
                            }],
                            data: {
                                "from": this.scatter.name,
                                "to": 'sovresources',
                                "quantity": this.$options.filters.eosAmountFormat(this.quantity, 'SOV'),
                                "memo": operation
                            }

                        }]
                    }).then(() => {
                        this.$notice.success(operation)
                    }).catch(error => {
                        console.error(`[rent | ${operation}]`, error)
                        this.$notice.error(`Rent "${operation}" error`)
                    })
            },
        }
    }
</script>