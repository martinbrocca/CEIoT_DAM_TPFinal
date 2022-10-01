
/* eslint-disable no-underscore-dangle */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable no-var */
import { Injectable } from '@angular/core';
import { Dispositivo } from '../model/dispositivo';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})



export class DispositivoService {
  urlApi="http://localhost:8000";

  constructor( public _http: HttpClient) { }

   getListadoDispositivos(): Promise<Dispositivo[]>{
    return this._http.get(this.urlApi+ "/device/").toPromise().then((listado: Dispositivo[])=>listado);
  }



  getDispositivo(id): Promise<Dispositivo>{
    console.log('DEBUG: Dispositivo Service - get dispositivo with ID: '+ id);
    return this._http.get(this.urlApi+"/device/"+id).toPromise().then((dispositivo: Dispositivo)=>{
      console.log('DEBUG: Dispositivo Service - API Result dispositivo: '+ dispositivo);
      return dispositivo;
    });
  };



}
