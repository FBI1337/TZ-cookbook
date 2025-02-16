import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from '../../services/recipe.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-recipe-list',
    templateUrl: './recipe-list.component.html',
    styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {

    recipes: Recipe[] = [];

    constructor(private recipeService: RecipeService, private router: Router) {}

    ngOnInit(): void {
        this.loadRecipes();
    }

    loadRecipes(): void {
        this.recipeService.getRecipes().subscribe(recipes => {
            this.recipes = recipes;
        });
    }

    viewRecipe(id: string | undefined): void {
        if (id) {
            this.router.navigate(['/recipes', id]);
        }
    }

    editRecipe(id: string | undefined): void {
        if (id) {
            this.router.navigate(['/recipes/edit', id])
        }
    }

    deleteRecipe(id: string | undefined): void {
        if (id) {
            if (confirm('Вы уверены, что хотите удалить рецепт?')) {
                this.recipeService.deleteRecipe(id);
                this.loadRecipes();
            }
        }
    }

    addRecipe(): void {
        this.router.navigate(['/recipes/create']);
    }
}