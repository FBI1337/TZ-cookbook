import { Component } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../models/recipe.model';

@Component({
    selector: 'app-recipe-list',
    templateUrl: './recipe-form.component.html',
    styleUrls: ['./recipe-form.component.css']
})
export class RecipeFormComponent {
    title = '';
    ingredients = [{ name: '', amount: 0, unit: ''}];
    description = '';
    imageUrl = '';

    constructor(private recipeService: RecipeService) {}

    addIngredient() {
        this.ingredients.push({ name: '', amount: 0, unit: '' });
    }

    removeIngredient(index: number) {
        this.ingredients.splice(index, 1);
    }

    saveRecipe() {
        const newRecipe: Recipe = {
            title: this.title,
            ingredients: this.ingredients,
            description: this.description,
            createdAt: new Date()
        };
        this.recipeService.addRecipe(newRecipe);
    }

}