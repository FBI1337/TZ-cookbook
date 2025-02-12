import {Component, OnInit} from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../models/recipe.model';



@Component({
    selector: 'app-recipe-list',
    templateUrl: './recipe-list.component.html',
    styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

    title = 'TZ-cookbook';
    recipes: Recipe[] = [];

    constructor(private recipeService: RecipeService) {}

    ngOnInit() {
        this.recipeService.recipes$.subscribe(recipes => {
            this.recipes = recipes;
        });
    }

    deleteRecipe(id: string) {
        if (confirm('Вы уверены, что хотите удалить рецепт?')) {
            this.recipeService.deleteRecipe(id);
        }
    }
}