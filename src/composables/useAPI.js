import axios from "axios";
import { ref } from 'vue'

const instance = axios.create({
    baseURL:'https://opentdb.com/',
})

const categories = ref([])

export default function useAPI() {
    const getCategories = async () => {
        if (categories.value.length === 0) {
            const response = await instance.get('api_category.php')
            categories.value = response.data.trivia_categories
        }
    }

    const getQuestion = async (categoryID) => {
        const response = await instance.get('api.php', {
            params: {
                amount: 1,
                category: categoryID, 
            }
        })

        return response.data.results[0]
    }


    return { instance, categories, getCategories, getQuestion}
}