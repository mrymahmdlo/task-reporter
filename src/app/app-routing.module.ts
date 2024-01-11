import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeneralTaskComponent } from './general-task/general-task.component';

const routes: Routes = [
  {
    path: '07707563FQ8d6H1246GQN937c6c5bbc65cd',
    component: GeneralTaskComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
