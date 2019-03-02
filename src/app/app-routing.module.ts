import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './pages/tabs/tabs.module#TabsPageModule' },
  { path: 'tabs/film', loadChildren: './pages/film/listFilm.module#ListFilmPageModule' },
  { path: 'tabs/serie', loadChildren: './pages/serie/listSerie.module#ListSeriePageModule' },
  { path: 'tabs/favorie', loadChildren: './pages/favorie/favorie.module#FavoriePageModule' },
  { path: 'detail/:id', loadChildren: './pages/details/details.module#DetailsPageModule' },
  { path: 'detail/:id/season/:idSeason', loadChildren: './pages/detail-saison/detail-saison.module#DetailSaisonPageModule' },
  { path: 'detail/:id/season/:idSeason/episode/:idEpisode', loadChildren: './pages/detail-episode/detail-episode.module#DetailEpisodePageModule' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
