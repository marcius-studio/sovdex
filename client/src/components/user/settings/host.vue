<template>
    <v-text-field v-model="host" label="Host">
        <v-icon @click="$store.commit('setHost', host)" slot="append">cached</v-icon>
    </v-text-field>
</template>

<script>
    export default {
        data: () => ({
            host: ''
        }),
        mounted() {
            this.host = this.$store.state.blockchain.host
        },
    }
</script>