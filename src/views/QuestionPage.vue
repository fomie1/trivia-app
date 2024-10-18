<script setup>
import { onMounted, ref } from 'vue';
import useAPI from '@/composables/useAPI';
import { useRoute } from 'vue-router';


const api = useAPI() 
const question = ref(null)
const route = useRoute()

onMounted(async () => {
  question.value = await api.getQuestion(route.params.id)
})


</script>



<template>
  {{ question }}


</template>
