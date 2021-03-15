<template>
    <v-container>
        <v-row class="justify-center mt-0">
            <v-col cols=12 sm=12 lg=8 md=6>
                <balance />
                <dashboard />
                <tinterface />
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
    import tinterface from './interface'

    export default {
        components: {
            tinterface,
        }
    }
</script>