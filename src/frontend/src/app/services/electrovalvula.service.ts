/* eslint-disable eqeqeq */

import { Injectable } from '@angular/core';
import { Electrovalvula } from '../model/Electrovalvula';

@Injectable({
  providedIn: 'root'
})
export class ElectrovalvulaService {

  listadoEV: Array<Electrovalvula> = new Array<Electrovalvula>();

  constructor() {
    const ev1: Electrovalvula= new Electrovalvula(1,'elPatio',1);
    const ev2: Electrovalvula= new Electrovalvula(2,'elCocina',0);
    const ev3: Electrovalvula= new Electrovalvula(3,'elJardin Delantero',1);
    const ev4: Electrovalvula= new Electrovalvula(4,'elLiving',0);
    this.listadoEV.push(ev1);
    this.listadoEV.push(ev2);
    this.listadoEV.push(ev3);
    this.listadoEV.push(ev4);
  }

  getEstadoActualEV(id): number {
    return this.listadoEV.filter(listadoEV=> listadoEV.evId==id)[0].apertura;
  }
}
