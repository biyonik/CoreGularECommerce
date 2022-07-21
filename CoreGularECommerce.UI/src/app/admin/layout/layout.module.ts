import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LayoutComponent} from './layout.component';
import {ComponentsModule} from "./components/components.module";
import {RouterModule} from "@angular/router";
import {NgxSpinnerModule} from "ngx-spinner";


@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    RouterModule,
    NgxSpinnerModule
  ],
  exports: [
    LayoutComponent
  ]
})
export class LayoutModule {
}
