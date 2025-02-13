import {Component, OnInit} from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { Router } from '@angular/router';
import { Recipe } from '../../models/recipe.model';



@Component({
    selector: 'app-recipe-list',
    templateUrl: './recipe-list.component.html',
    styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

    recipes: Recipe[] = [];

    constructor(private recipeService: RecipeService, private router: Router) {}

    ngOnInit() {
        this.recipeService.recipes$.subscribe(recipes => {
            this.recipes = recipes;
        });
    }

    editRecipe(recipe: Recipe) {
        this.router.navigate(['/edit', recipe.id]);
    }

    deleteRecipe(id: string) {
        if (confirm('Вы уверены, что хотите удалить рецепт?')) {
            this.recipeService.deleteRecipe(id);
        }
    }
}