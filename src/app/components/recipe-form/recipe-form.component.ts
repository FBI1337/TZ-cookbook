import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RecipeService } from '../../services/recipe.service';
import { Ingredient, Recipe } from '../../models/recipe.model';

@Component({
    selector: 'app-recipe-list',
    templateUrl: './recipe-form.component.html',
    styleUrls: ['./recipe-form.component.css']
})
export class RecipeFormComponent {
    recipeForm: FormGroup;
    recipeId: string | null = null; 
    imagePreview: string | null = null;

    constructor(
        private fb: FormBuilder,
         private recipeService: RecipeService,
         private route: ActivatedRoute, 
         private router: Router,
        ) {
        this.recipeForm = this.fb.group({
            title: ['', Validators.required],
            description: ['', Validators.required],
            ingredients: this.fb.array([]),
            imageUrl: ['', Validators.required]
        });
    }

    get ingredients(): FormArray {
        return this.recipeForm.get('ingredients') as FormArray;
    }
    
    createIngredient(ingredient: Ingredient = { name: '', amount: 1, unit: ''}): FormGroup {
        return this.fb.group({
            name: [ingredient.name, Validators.required],
            amount: [ingredient.amount, [Validators.required, Validators.min(1)]],
            unit: [ingredient.unit]
        });
    }

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            const id = params.get('id');
            if (id) {
                this.recipeId = id;
                const recipe = this.recipeService.getRecipeById(id);
                if (recipe) {
                    this.recipeForm.patchValue({
                        title: recipe.title,
                        description: recipe.description,
                        imageUrl: recipe.imageUrl,
                    });

                    this.imagePreview = recipe.imageUrl ?? null;

                    this.ingredients.clear();
                    recipe.ingredients.forEach(ing => {
                        this.ingredients.push(this.createIngredient(ing));
                    });
                }
            }
        });
    }

    onFileSelected(event: Event) {
        const file = (event.target as HTMLInputElement).files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                this.imagePreview = reader.result as string;
                this.recipeForm.patchValue({ imageUrl: this.imagePreview })
            };
            reader.readAsDataURL(file);
        }
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
                id: this.recipeId ?? (Math.random()*10000).toFixed(0),
                title: this.recipeForm.value.title,
                description: this.recipeForm.value.description,
                ingredients: this.recipeForm.value.ingredients,
                imageUrl: this.recipeForm.value.imageUrl,
                createdAt: new Date()
            };
            if (this.recipeId) {
                this.recipeService.updateRecipe(newRecipe);
            } else {
                this.recipeService.addRecipe(newRecipe);
            }

            this.router.navigate(['/']);
        }
    }
}