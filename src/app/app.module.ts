import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//Para consumir la API:
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
//Para realizar bindeo two-way:
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { FilterComponent } from './views/dashboard/filter/filter.component';
import { TableComponent } from './views/dashboard/table/table.component';
import { NotFoundComponent } from './views/not-found/not-found.component';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    NotFoundComponent,
    FilterComponent,
    DashboardComponent,
    TableComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    Ng2OrderModule,
    Ng2SearchPipeModule,
    NgbModule,
    NgxDaterangepickerMd.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
