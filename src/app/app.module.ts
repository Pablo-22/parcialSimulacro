import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './vistas/home/home.component';
import { BusquedaComponent } from './vistas/busqueda/busqueda.component';
import { PeliculaAltaComponent } from './peliculas/pelicula-alta/pelicula-alta.component';
import { ActorAltaComponent } from './actores/actor-alta/actor-alta.component';
import { PeliculaListadoComponent } from './peliculas/pelicula-listado/pelicula-listado.component';
import { ActorListadoComponent } from './actores/actor-listado/actor-listado.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BusquedaComponent,
    PeliculaAltaComponent,
    ActorAltaComponent,
    PeliculaListadoComponent,
    ActorListadoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
