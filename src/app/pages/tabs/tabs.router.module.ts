import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'film',
        loadChildren: '../film/listFilm.module#ListFilmPageModule'
      },
      {
        path: 'serie',
        loadChildren: '../serie/listSerie.module#ListSeriePageModule'
      },
      {
        path: 'favorie',
        loadChildren: '../favorie/favorie.module#FavoriePageModule'
      },
      {
        path: '',
        redirectTo: '/tabs/film',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/film',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
