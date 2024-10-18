<script setup>
import { onMounted, ref } from 'vue';
import useAPI from '@/composables/useAPI';
import { useRoute } from 'vue-router';
import BaseTitle from '@/components/BaseTitle.vue';


const api = useAPI() 
const question = ref(null)
const route = useRoute()
const answers = ref([])


onMounted(async () => {
  question.value = await api.getQuestion(route.params.id)


  answers.value.push({
    id: answers.value.length,
    correct: true,
    answer: question.value.correct_answer
  })

  question.value.incorrect_answers.map((wrong_answer) => {
    answers.value.push({
      id: answers.value.length,
      correct: false,
      answer: wrong_answer
    })
  })

  answers.value = shuffle(answers.value)
  //console.log(question.value)

})

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    //swap
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array
}




</script>



<template>

 <div v-if="question" class="">
  <BaseTitle> {{ question.category }}</BaseTitle>
  {{ question.question }}

  <div v-for="answer in answers" v-html="answer.answer" :key="answer.id" class=""></div>

 </div>
 <div v-else class="">
    Loading...
 </div>

</template>
