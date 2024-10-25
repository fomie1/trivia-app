<script setup>
const props = defineProps({
    difficulty: {
        type: String,
        reuired: true,
    }
})
</script>


<template>
    <p class="px-4 py-2 rounded-full border absolute uppercase text-white bottom-5 left-8 text-2xl font-bold"
    :class="props.difficulty === 'easy' ? 'bg-green-600' : props.difficulty === 'medium' ? 'bg-yellow-600' : 'bg-red-600'">
    {{ props.difficulty }}
    </p>
</template>