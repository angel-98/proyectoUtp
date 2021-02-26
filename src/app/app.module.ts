//Angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//Http handlers
import { HttpClientModule } from '@angular/common/http';
//Forms
import { FormsModule } from '@angular/forms';
//Material
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
//flex layout
import { FlexLayoutModule } from '@angular/flex-layout';
//Routes
import { AppRoutingModule } from './app-routing.module';
//Main component
import { AppComponent } from './app.component';
//Custome services
import { DispServices } from './dispositivos/disp.service';
//custome components
import { CuhDispComponent} from './dispositivos/cuh-disp/cuh-disp.component';
import { DispDetalleComponent} from './dispositivos/disp-detalle/disp-detalle.component';
import { CuhIotComponent } from './dispositivos/cuh-iot/cuh-iot.component';




@NgModule({
  declarations: [
    AppComponent,
    CuhDispComponent,
    DispDetalleComponent,
    CuhIotComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    FlexLayoutModule ,
    MatToolbarModule,
    MatIconModule,
    MatCardModule
  ],
  providers: [DispServices],
  bootstrap: [AppComponent]
})
export class AppModule { }
