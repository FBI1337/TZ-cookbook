import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormArray, FormGroup, Validators } from "@angular/forms";
import { RecipeService } from "src/app/services/recipe.service";
import { UnitService } from "src/app/services/unit.service";
import { Unit } from "src/app/models/unit.model";
import { ActivatedRoute, Router } from "@angular/router";
import { Recipe } from "src/app/models/recipe.model";

@Component({
    selector: 'app-recipe-create',
    templateUrl: './recipe-create.component.html',
    styleUrls: ['./recipe-create.component.css'],
})
export class RecipeCreateComponent implements OnInit {

    recipeForm: FormGroup;
    units: Unit[] = [];
    isEditMode: boolean = false;
    recipeId: string | null = null; 
    imageUrl: string = '';

    constructor(
        private fb: FormBuilder,
        private recipeService: RecipeService,
        private unitService: UnitService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.recipeForm = this.fb.group({
            name: ['', Validators.required],
            ingredients: this.fb.array([]),
            description: ['', Validators.required],
            imageUrl: [''], 
        })
    }

    ngOnInit(): void {
        this.unitService.getUnits().subscribe(units => {
            this.units = units;
        });

        this.recipeId = this.route.snapshot.paramMap.get('id');
        this.isEditMode = !!this.recipeId;

        if (this.isEditMode) {
            this.loadRecipeForEdit();
        } else {
            this.addIngredient();
        }
    }

    loadRecipeForEdit(): void {
        if (this.recipeId) {
            this.recipeService.getRecipe(this.recipeId).subscribe(recipe => {
                if (recipe) {
                    this.recipeForm.patchValue({
                        name: recipe.title,
                        description: recipe.description,
                        imageUrl: recipe.imageUrl
                    });
                    this.imageUrl = recipe.imageUrl || '';

                    this.ingredients.clear();

                    recipe.ingredients.forEach(ingredient => {
                        this.addIngredient(ingredient.name, ingredient.amount, ingredient.unit);
                    });
                }
            });
        }
    }

    get ingredients(): FormArray {
        return this.recipeForm.get('ingredients') as FormArray;
    }

    addIngredient(name: string = '', amount: number = 0, unit: string = ''): void {
        this.ingredients.push(this.fb.group({
            name: [name, Validators.required],
            amount: [amount, Validators.required],
            unit: [unit, Validators.required],
        }));
    }

    deleteIngredient(index: number): void {
        this.ingredients.removeAt(index);
    }

    onSubmit(): void {
        if (this.recipeForm.valid) {
            const recipe: Recipe = {
                title: this.recipeForm.value.title,
                ingredients: this.recipeForm.value.ingredients,
                description: this.recipeForm.value.description,
                imageUrl: this.recipeForm.value.imageUrl,
                createdAt: new Date(),
            };

            if (this.isEditMode && this.recipeId) {
                recipe.id = this.recipeId;
                this.recipeService.updateRecipe(recipe);
            } else {
                this.recipeService.addRecipe(recipe);
            }

            this.router.navigate(['/recipes']);
        }
    }

    onFileSelected(event: any) {
        const file: File = event.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = (e: any) => {
                this.imageUrl = e.target.result;
                this.recipeForm.patchValue({ imageUrl: this.imageUrl });
            };
            reader.readAsDataURL(file);
        }
    }
}