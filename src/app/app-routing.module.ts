import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ItemListComponent }    from './item/item-list.component';
import { ItemShowComponent }    from './item/item-show.component';
import { HomepageComponent }    from './homepage/homepage.component';
import { ItemNewComponent }     from './item/item-new.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home',            component: HomepageComponent },
  { path: 'items',           component: ItemListComponent },
  { path: 'items/new',       component: ItemNewComponent },
  { path: 'items/:id',       component: ItemShowComponent },
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {

}
