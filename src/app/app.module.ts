import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { EmployeeDetailComponent } from './components/employee-detail/employee-detail.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { registerLocaleData } from '@angular/common';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import en from '@angular/common/locales/en';
import { BioPipe } from './components/custom/bio.pipe';
import { NumberDirective } from './components/custom/number.directive';
registerLocaleData(en);
@NgModule({
  declarations: [
    AppComponent,
    EmployeeDetailComponent,
    EmployeeListComponent,
    BioPipe,
    NumberDirective
  ],
  imports: [
    BrowserAnimationsModule,
    NzAlertModule,
    FormsModule,
    ReactiveFormsModule,
    NzDatePickerModule,
    NzMessageModule,
    NzCardModule,
    NzGridModule,
    NzButtonModule,
    NzFormModule,
    NzTabsModule,
    NzDividerModule,
    NzTableModule,
    BrowserModule,
    AppRoutingModule,
    NzInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
