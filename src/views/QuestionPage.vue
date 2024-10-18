<script setup>
import { onMounted, ref } from 'vue';
import useAPI from '@/composables/useAPI';
import { useRoute } from 'vue-router';
import BaseTitle from '@/components/BaseTitle.vue';


const api = useAPI() 
const question = ref(null)
const route = useRoute()

onMounted(async () => {
  question.value = await api.getQuestion(route.params.id)
})


</script>



<template>

 <div v-if="question" class="">
  <BaseTitle> {{ question.category }}</BaseTitle>
  {{ question.question }}

 </div>
 <div v-else class="">
    Loading...
 </div>

</template>
