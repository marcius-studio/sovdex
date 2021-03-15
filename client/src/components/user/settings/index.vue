<template>
    <modal title="Settings" event="settings">
        <rent class="mb-5" />
        <host />
    </modal>
</template>

<script>
    import rent from './rent.vue'
    import host from './host.vue'

    export default {
        components: {
            rent,
            host,
        }
    }
</script>