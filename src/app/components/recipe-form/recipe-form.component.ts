import { Component } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { Ingredient, Recipe } from '../../models/recipe.model';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-recipe-list',
    templateUrl: './recipe-form.component.html',
    styleUrls: ['./recipe-form.component.css']
})
export class RecipeFormComponent {
    recipeForm: FormGroup;

    constructor(private fb: FormBuilder, private recipeService: RecipeService) {
        this.recipeForm = this.fb.group({
            title: ['', Validators.required],
            description: ['', Validators.required],
            ingredients: this.fb.array([], Validators.required),
            imageUrl: ['']
        });
    }

    get ingredients() {
        return this.recipeForm.get('ingredients') as FormArray;
    }
    
    createIngredient(): FormGroup {
        return this.fb.group({
            name: ['', Validators.required],
            amount: [0, [Validators.required, Validators.min(1)]],
            unit: ['', Validators.required]
        })
    }

    addIngredient() {
        this.ingredients.push(this.createIngredient());
        this.recipeForm.updateValueAndValidity();
        console.log('qwerty добавлен:', this.ingredients.value);
    }

    removeIngredient(index: number) {
        this.ingredients.removeAt(index);
        this.recipeForm.updateValueAndValidity();
        console.log('qwerty удален:', this.ingredients.value);
    }

    saveRecipe() {
        if(this.recipeForm.valid) {
            const newRecipe: Recipe = {
                title: this.recipeForm.value.title,
                description: this.recipeForm.value.description,
                ingredients: this.recipeForm.value.ingredients.map((inng: Ingredient) =>({
                    name: inng.name.trim(),
                    amount: inng.amount,
                    unit: inng.unit.trim()
                })),
                imageUrl: this.recipeForm.value.imageUrl,
                createdAt: new Date()
            };

            console.log('Рецепт сохранен', newRecipe);
            this.recipeService.addRecipe(newRecipe);
            this.recipeForm.reset();
            this.ingredients.clear();
            this.recipeForm.updateValueAndValidity();
        } else {
            console.log('Форма недействительна', this.recipeForm.errors);
        }
    }
}