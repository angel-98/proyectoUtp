import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CuhDispComponent } from './dispositivos/cuh-disp/cuh-disp.component';
import { CuhIotComponent } from './dispositivos/cuh-iot/cuh-iot.component';

const routes: Routes = [
  {path:'', component: CuhIotComponent},
  {path:'create', component: CuhDispComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
