<script>
</script>

<template>
    <div class="widget-palaceholder">
        <v-btn class="ma-2" color="primary" icon="mdi-plus" @click="$emit('selectComponent')">
        </v-btn>
        <slot></slot>
    </div>
</template>

<style>
.widget-palaceholder {
    width: 100%;
    background: rgb(0 0 0 / 12%);
    min-height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100%;
}
</style>