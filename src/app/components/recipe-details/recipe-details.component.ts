import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-recipe-details',
    templateUrl: './recipe-details.component.html',
    styleUrls: ['./recipe-details.component.css'],
})
export class RecipeDetailsComponent implements OnInit {

    recipe: Recipe | undefined;

    constructor(
        private recipeService: RecipeService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.loadRecipe();
    }

    loadRecipe(): void {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.recipeService.getRecipe(id).subscribe(recipe => {
                this.recipe = recipe;
            });
        }
    }

    editRecipe(): void {
        if (this.recipe && this.recipe.id) {
            this.router.navigate(['/recipes/edit', this.recipe.id]);
        }
    }

    deleteRecipe(): void {
        if (this.recipe && this.recipe.id) {
            if (confirm('Вы уверены, что хотите удалить этот рецепт?')) {
                this.recipeService.deleteRecipe(this.recipe.id);
                this.router.navigate(['/recipes']);
            }
        }
    }

    goBack(): void {
        this.router.navigate(['/recipes']);
    }

}