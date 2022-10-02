import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActoresRoutingModule } from './actores-routing.module';
import { PaisTablaComponent } from 'src/app/paises/pais-tabla/pais-tabla.component';
import { ActorAltaComponent } from '../actor-alta/actor-alta.component';
import { ActorListadoComponent } from '../actor-listado/actor-listado.component';


@NgModule({
  declarations: [
	PaisTablaComponent,
	ActorAltaComponent,
],
  imports: [
    CommonModule,
    ActoresRoutingModule,
  ]
})
export class ActoresModule { }
