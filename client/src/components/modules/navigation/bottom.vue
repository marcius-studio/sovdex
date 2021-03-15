lines (68 sloc) 1.8 KB
<template>
    <v-bottom-navigation class="d-flex d-sm-none bottom-navigation" grow >
		<v-btn :to="i.to" v-for="i,idx in schema" v-if="(i.auth && $store.getters.isAuth) || !i.auth" :key="idx">
			<!--span>{{i.label}}</span-->
			<v-icon>{{i.icon}}</v-icon>
		</v-btn>
        <v-btn @click="$bus.$emit('settings')" v-if="$store.getters.isAuth" icon>
            <v-icon>settings_input_antenna</v-icon>
        </v-btn>
        <btn-auth />
	</v-bottom-navigation>
</template>

<script>
    import btnAuth from '@/components/user/auth'
    import schema from './schema'
    export default {
        data: () => ({
            schema
        }),
        components: {
            btnAuth
        }
    }
</script>

<style lang=scss scoped>
	.bottom-navigation {
		z-index: 999;
		position: fixed;
		bottom: 0;
		width: 100%;
	}
</style>