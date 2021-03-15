<template>
    <div class="d-none d-sm-flex">
        <v-toolbar flat>
            <img :src="logo" width="50px" class="mr-5" alt="">

            <!--icon-svg class="mr-2" name="logo" width="60px" height="60px"></icon-svg-->
            <v-toolbar-items v-for="(i,idx) in schema" :key="idx" v-if="(i.auth && $store.getters.isAuth) || !i.auth">
                <v-btn :to="i.to" text>{{ i.label }}</v-btn>
            </v-toolbar-items>


            <v-spacer></v-spacer>

            <v-btn @click="$bus.$emit('settings')" v-if="$store.getters.isAuth" icon>
                <v-icon>settings_input_antenna</v-icon>
            </v-btn>

         
            <btn-auth class="mr-2" />
           

        </v-toolbar>
    </div>

    <!--div class="header flex-centered bg-secondary">
        <div class="container grid-xl">
            <div class="unit">
                <div class="unit-section">
                    <div class="tile tile-list" style="line-height: 20px;">
                        <div class="tile-section tile-icon">
                            <figure class="icon" style="background-color: transparent;">
                                <img src="image\logo.svg" height="40px">
                            </figure>
                        </div>
                        <div class="tile-section">
                            <div class="text-bold">SOVDEX</div>
                            <div class="text-sm text-secondary" v-if="$store.getters.isAuth">
                                @{{$store.state.blockchain.scatter.name}}</div>
                        </div>
                    </div>
                </div>
                <div class="unit-section hide-sm">
                    <router-link v-if="$store.getters.isAuth" v-for="(i,idx) in schema" :to="i.route"
                        :key="idx" class="link link-padding" :class="{'active' : i.route.name == $route.name}">{{i.name}}
                    </router-link>
                    <span v-if="$store.getters.isAuth" class="link link-padding material-icons"
                        @click="$bus.$emit('settings')">settings_input_antenna</span>
                    <auth class="ml" />
                </div>
            </div>
        </div>
    </div-->
</template>

<script>
    import btnAuth from '@/components//user/auth'
    import schema from './schema'

    import logo from '@/assets/icons/logo.png'

    export default {
        data: () => ({
            logo,
            schema
        }),
        components: {
            btnAuth
        }
    }
</script>