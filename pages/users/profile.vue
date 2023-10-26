<template>
    <div>
        <h1>{{ store.user.name }}</h1>
        <button class="btn btn-primary" @click="change()">Change</button>
    </div>
</template>
<script setup lang="ts">
    import { useAppStore } from '@/stores/index';
    const store = useAppStore();
    function change() {
        store.user.name = 'Gergana';
        store.user.nickname = 'Geri';
        store.user.email = 'Gk23@asdf.c';
    }
</script>
<style scoped></style>
