import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'app-recipe-edit',
    template: '<app-recipe-create [recipeId]="recipeId"></app-recipe-create>'
})
export class RecipeEditComponent implements OnInit {
    recipeId: string | null = null;

    constructor (private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.recipeId = this.route.snapshot.paramMap.get('id');
    }
}