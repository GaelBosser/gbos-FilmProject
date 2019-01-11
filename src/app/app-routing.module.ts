import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'film', loadChildren: './film/film.module#FilmPageModule' },
  { path: 'serie', loadChildren: './serie/serie.module#SeriePageModule' },
  { path: 'favorie', loadChildren: './favorie/favorie.module#FavoriePageModule' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
