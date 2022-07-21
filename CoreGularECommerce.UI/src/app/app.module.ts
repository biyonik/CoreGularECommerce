import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AdminModule} from "./admin/admin.module";
import {UiModule} from "./ui/ui.module";
import {ComponentsModule} from "./components/components.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AlertModule} from "./utils/alert/alert.module";
import {ToastrModule} from "ngx-toastr";
import {NgxSpinnerModule} from "ngx-spinner";
import {HttpClientModule} from "@angular/common/http";
import { DeleteDirective } from './directives/admin/delete.directive';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule,
    UiModule,
    ComponentsModule,
    BrowserAnimationsModule,
    AlertModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: 'BASE_URL',
      useValue: 'https://localhost:7010/api',
      multi: true
    }
  ],
  bootstrap: [AppComponent],
    exports: [
        NgxSpinnerModule
    ]
})
export class AppModule {
}
