<script setup>
import { onMounted, ref } from 'vue';
import useAPI from '@/composables/useAPI';
import { useRoute } from 'vue-router';
import BaseTitle from '@/components/BaseTitle.vue';
import DifficultyChip from '@/components/DifficultyChip.vue';
import MainScore from '@/components/MainScore.vue';
import useScore from '@/composables/useScore';
import router from '@/router';


const api = useAPI() 
const question = ref(null)
const route = useRoute()
const answers = ref([])
const { changeScore } = useScore()
const notification = ref('')





onMounted(async () => {
  question.value = await api.getQuestion(route.params.id)


  answers.value.push({
    id: answers.value.length,
    correct: true,
    answer: question.value.correct_answer,
    points: question.value.difficulty == 'easy' ? 10 : question.value.difficulty === 'medium' ? 20 : 30,


  })

  question.value.incorrect_answers.map((wrong_answer) => {
    answers.value.push({
      id: answers.value.length,
      correct: false,
      answer: wrong_answer,
      points: -5,
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


//handle answer choices and award points 
const handleAnswer = (points) => {
  changeScore(points)

  if (points > 0) {
    notification.value = 'CORRECT'

  }
  else {
    notification.value = 'INCORRECT'
  }

  setTimeout(() => {
    router.push('/trivia-app/')
  }, 1000)
}



</script>



<template>

 <div v-if="question" class="flex h-full w-full flex-col items-center gap-8 p-10">
  <BaseTitle>
    <MainScore></MainScore> &nbsp;
    <span class="font-bold" :class="notification === 'CORRECT' ? 'text-green-500' : 'text-red-500'">
      {{ notification }}
    </span>
  
  </BaseTitle>


  <!-- {{ question.question }} -->

  <div v-html="question.question" class="text-center text-2xl font-bold"></div>
  <div class="grid w-full flex-grow grid-cols-2 gap-8">
  <div v-for="answer in answers" 
  v-html="answer.answer" 
  :key="answer.id" 
  @click="handleAnswer(answer.points)"
  class="bg-green-500 flex items-center justify-center text-4xl rounded-lg text-white py-10 px-2">
  </div>

  </div>

  <DifficultyChip :difficulty="question.difficulty"></DifficultyChip>
 </div>
 <div v-else class="">
    Loading...
 </div>

</template>
