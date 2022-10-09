/* eslint-disable no-underscore-dangle */
/* eslint-disable eqeqeq */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Electrovalvula } from '../model/Electrovalvula';
import { Logs } from '../model/logRiegos';

@Injectable({
  providedIn: 'root'
})


  export class ElectrovalvulaService {
    //logs: Logs = new Logs;
    urlApi='http://localhost:8000';

      constructor(private _http: HttpClient ) {
     }

    async getEstadoActualEV(id): Promise<number> {
      try {
        const respuesta: any = this._http.get(this.urlApi+'/logs/'+id).toPromise();
        console.log('DEBUG: EV Service - GetEstadoActualEV - ' + respuesta);
        console.log(respuesta);
        // return this._http.get(this.urlApi+'/logs/'+id).toPromise().then((log: Logs)=>log.apertura);
        return (await respuesta).apertura;
      }
      catch (error)
      {
       console.log('DEBUG - Catched error in GetEstadoActualEV - ' + error);
        // const cerrada: Promise<number> = 0;
        return (0);
      }
}
  }
