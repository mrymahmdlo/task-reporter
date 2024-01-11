import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { SliderComponent } from './slider/slider.component';
import { TaskListComponent } from './task-list/task-list.component';

//
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { GeneralTaskComponent } from './general-task/general-task.component';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    SliderComponent,
    TaskListComponent,
    EditTaskComponent,
    GeneralTaskComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzLayoutModule,
    NzButtonModule,
    NzBreadCrumbModule,
    NzMenuModule,
    NzPageHeaderModule,
    NzIconModule,
    NzTableModule,
    NzTagModule,
    NzModalModule,
    NzInputModule,
    NzSelectModule,
    NzMessageModule,
  ],
  providers: [NzMessageModule, { provide: NZ_I18N, useValue: en_US }],

  bootstrap: [AppComponent],
})
export class AppModule {}
