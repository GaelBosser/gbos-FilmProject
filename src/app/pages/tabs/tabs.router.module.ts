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
        children: [
          {
            path: '',
            loadChildren: '../film/listFilm.module#ListFilmPageModule'
          }
        ]
      },
      {
        path: 'serie',
        children: [
          {
            path: '',
            loadChildren: '../serie/listSerie.module#ListSeriePageModule'
          }
        ]
      },
      {
        path: 'favorie',
        children: [
          {
            path: '',
            loadChildren: '../favorie/favorie.module#FavoriePageModule'
          }
        ]
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
