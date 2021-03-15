<template>
    <v-app>
        <div class="content">
            <div class="content-header" style="z-index: 9;">
                <headerNavigation />
            </div>
            <div class="content-body" :class="{'mobile-padding':  $store.getters.isAuth}">
                <router-view></router-view>
            </div>
            <div class="content-footer">
                <bottomNavigation />

                <!--components-->
                <settings />
            </div>
        </div>
    </v-app>
</template>

<script>
    import headerNavigation from './modules/navigation/header'
    import bottomNavigation from './modules/navigation/bottom'

    import isConnected from './modules/isConnected'

    import balance from './user/balance'
    import settings from './user/settings'

    export default {
        mounted() {
            // https://github.com/nikitamarcius
            console.log('%c Developed by Nikita Marcius', 'background: #5490f1; color: white; display: block;', 'https://github.com/nikitamarcius')
        },
        components: {
            headerNavigation,
            bottomNavigation,

            isConnected,

            balance,
            settings,
        }
    }
</script>

<style lang=scss scoped>
    @media screen and (max-width: 600px) {
        .mobile-padding {
            padding-bottom: 56px;
        }
    }
</style>