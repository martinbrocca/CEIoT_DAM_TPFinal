/* eslint-disable eqeqeq */
import { Injectable } from '@angular/core';
import { Logs } from '../model/logRiegos';

@Injectable({
  providedIn: 'root'
})
export class LogsService {
  logs: Array<Logs> = new Array<Logs>();

  constructor() {
    const log1: Logs= new Logs(1,new Date(),0,1);
    const log2: Logs= new Logs(2,new Date(),1,1);
    const log3: Logs= new Logs(3,new Date(),0,2);
    const log4: Logs= new Logs(4,new Date(),1,2);
    const log5: Logs= new Logs(5,new Date(),0,3);
    const log6: Logs= new Logs(6,new Date(),1,3);
    const log7: Logs= new Logs(7,new Date(),0,4);
    const log8: Logs= new Logs(8,new Date(),1,4);
    this.logs.push(log1);
    this.logs.push(log2);
    this.logs.push(log3);
    this.logs.push(log4);
    this.logs.push(log5);
    this.logs.push(log6);
    this.logs.push(log7);
    this.logs.push(log8);
   }

  getLogsValvula(id): Logs[] {
    return this.logs.filter(logs=> logs.electrovalvulaId==id);
  }

  newEntrada(log: Logs) {
    this.logs.push(log);
  }
}
