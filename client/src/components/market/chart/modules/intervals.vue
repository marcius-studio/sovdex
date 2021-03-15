<template>
    <v-toolbar dense flat color="transparent">
        <v-toolbar-items>
            <v-btn :to="{name: 'market', params: {symbol: symbol}, query: {interval: i}}" v-for="i,idx in intervals"
                :key="idx" elevation=0 text exact>{{i}}</v-btn>
        </v-toolbar-items>
    </v-toolbar>
</template>


<script>
    export default {
        data: () => ({
            intervals: ['5m', '15m', '1h', '4h', '1d']
        }),
        computed: {
            symbol() {
                return this.$route.params.symbol || 'soveos'
            }
        }
    }
</script>