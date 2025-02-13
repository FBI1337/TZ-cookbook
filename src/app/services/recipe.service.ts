import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Recipe } from "../models/recipe.model";

@Injectable({
  providedIn: 'root'
})

export class RecipeService {
    private recipes: Recipe[] = [];
    private recipesSubject = new BehaviorSubject<Recipe[]>(this.recipes);

    recipes$ = this.recipesSubject.asObservable();

    constructor() {}

    addRecipe(recipe: Recipe) {
      console.log('Добавление рецепта', recipe);
      recipe.id = (Math.random() * 1000).toFixed(0);
      recipe.createdAt = new Date();
      this.recipes.push(recipe);
      this.recipesSubject.next([...this.recipes]);
    }

    updateRecipe(updateRecipe: Recipe) {
      const index = this.recipes.findIndex(r => r.id === updateRecipe.id);
      if (index > -1) {
        this.recipes[index] = updateRecipe;
        this.recipesSubject.next([...this.recipes]);
      }
    }

    deleteRecipe(id: string) {
      console.log('Удаление рецепта с ID', id);
      this.recipes = this.recipes.filter(r => r.id !== id);
      this.recipesSubject.next([...this.recipes]);
    }

    getRecipeById(id: string): Recipe | undefined {
      return this.recipes.find(recipe => recipe.id === id);
    }
}