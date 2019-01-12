import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './pages/tabs/tabs.module#TabsPageModule' },
  { path: 'film', loadChildren: './pages/film/film.module#FilmPageModule' },
  { path: 'serie', loadChildren: './pages/serie/serie.module#SeriePageModule' },
  { path: 'favorie', loadChildren: './pages/favorie/favorie.module#FavoriePageModule' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
