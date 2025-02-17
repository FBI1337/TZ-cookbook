import { Injectable } from "@angular/core";
import { Recipe } from "../models/recipe.model";
import { Observable, of } from "rxjs";
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class RecipeService {

    private recipes: Recipe[] = [];
    

    constructor(private firestore: AngularFirestore) {
      this.loadRecipesFormLocalStorage();
    }

    private loadRecipesFormLocalStorage() {
      const storedRecipes = localStorage.getItem('recipes');
      if (storedRecipes) {
        this.recipes = JSON.parse(storedRecipes);
      }
    }

    private saveRecipesToLocalStorage() {
      localStorage.setItem('recipes', JSON.stringify(this.recipes));
    }

    getRecipes(): Observable<Recipe[]> {
      console.log('qwerty');
      return of(this.recipes);
    }

    getRecipe(id: string): Observable<Recipe | undefined> {
      return of(this.recipes.find(recipe => recipe.id === id));
    }

    addRecipe(recipe: Recipe) {
      recipe.id = this.generateId();
      this.recipes.push(recipe);
      this.saveRecipesToLocalStorage();
    }

    updateRecipe(recipe: Recipe) {
      const index = this.recipes.findIndex(r => r.id === recipe.id);
      if (index !== -1) {
        this.recipes[index] = recipe;
        this.saveRecipesToLocalStorage();
      }
    }

    deleteRecipe(id: string) {
      this.recipes = this.recipes.filter(recipe => recipe.id !== id);
      this.saveRecipesToLocalStorage();
    }

    private generateId(): string {
      return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }
}