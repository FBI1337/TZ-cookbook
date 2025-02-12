import { Component } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../models/recipe.model';
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
            ingredients: this.fb.array([
                this.createIngredient()
            ]),
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
            unit: ['']
        })
    }

    addIngredient() {
        this.ingredients.push(this.createIngredient());
    }

    removeIngredient(index: number) {
        this.ingredients.removeAt(index);
    }

    saveRecipe() {
        if(this.recipeForm.valid) {
            const newRecipe: Recipe = {
                title: this.recipeForm.value.title,
                description: this.recipeForm.value.description,
                ingredients: this.recipeForm.value.ingredients,
                imageUrl: this.recipeForm.value.imageUrl,
                createdAt: new Date()
            };
            this.recipeService.addRecipe(newRecipe);
            console.log('Рецепт сохранен', newRecipe);
            this.recipeForm.reset();
        } else {
            console.log('Форма недействительна');
        }
    }
}