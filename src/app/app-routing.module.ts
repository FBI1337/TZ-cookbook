import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import { RecipeCreateComponent } from './components/recipe-create/recipe-create.component';
import { RecipeDetailsComponent } from './components/recipe-details/recipe-details.component';

const routes: Routes = [
  { path: 'recipes', component: RecipeListComponent },
  { path: 'recipes/create', component: RecipeCreateComponent },
  { path: 'recipes/edit/:id', component: RecipeCreateComponent },
  { path: 'recipes/:id', component: RecipeDetailsComponent},
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
