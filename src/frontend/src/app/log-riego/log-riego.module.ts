import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LogRiegoPageRoutingModule } from './log-riego-routing.module';

import { LogRiegoPage } from './log-riego.page';
import { AbiertaCerradaPipe } from '../pipes/abierta-cerrada.pipe';
import { ResaltarDirective } from '../directives/resaltar.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LogRiegoPageRoutingModule
  ],
  declarations: [
    LogRiegoPage,
    AbiertaCerradaPipe,
    ResaltarDirective
  ]
})
export class LogPageModule {}
