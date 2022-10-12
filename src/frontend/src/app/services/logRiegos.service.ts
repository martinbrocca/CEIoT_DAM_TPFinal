/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
/* eslint-disable eqeqeq */
import { Injectable } from '@angular/core';
import { Logs } from '../model/logRiegos';
import { HttpClient } from '@angular/common/http';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LogsService {
  logs: Array<Logs> = new Array<Logs>();
  urlApi='http://localhost:8000/api/v1';

    constructor(private _http: HttpClient ) {
   }


  getLogsValvula(id): Promise<Logs[]> {
    console.log('DEBUG: Log-Riego Service - getLogsValvula ' + id );
    return this._http.get(this.urlApi+'/logs/'+id +'/all').toPromise().then((logsRiego: Logs[])=>logsRiego);
  }

  // Add a new log value into the logs table.
  // invokes API Endpoint http://localhost:8000/api/v1/logs/add with a log variable
  newEntrada(log: Logs) {
    // return this._http.post(this.urlApi+'/logs/add',{apertura:log.apertura, fecha:formatDate(log.fecha,'YYYYMMddhhmmss', 'en-US', 'CST' ), electrovalvulaId:log.electrovalvulaId}).toPromise().then((result)=>result);
    //return this._http.post(this.urlApi+'/logs/add',{apertura:log.apertura, fecha:log.fecha.toISOString(), electrovalvulaId:log.electrovalvulaId}).toPromise().then((result)=>result);
    return this._http.post(this.urlApi+'/logs/add',{apertura:log.apertura, fecha:log.fecha.toISOString().slice(0, 19).replace('T', ' '), electrovalvulaId:log.electrovalvulaId}).toPromise().then((result)=>result);
  }
}
