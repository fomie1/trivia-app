<script setup>
import useScore from '@/composables/useScore';
    const {score} = useScore()
</script>


<template>
    <span class="">Main Score: {{ score }}</span>
</template>