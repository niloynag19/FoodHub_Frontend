import { mealService } from "@/services/meals.services";

export default async function MealsPage(){
    const {data}=await mealService.getAllMeals();
    console.log(data);
}