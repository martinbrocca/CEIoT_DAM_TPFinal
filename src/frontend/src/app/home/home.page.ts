
import { Component } from '@angular/core';
import { DispositivoService } from '../services/dispositivo.service';
import { Dispositivo } from '../model/dispositivo';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
   listadoDispositivo: Dispositivo[];

  constructor( public dispositivoServ: DispositivoService) {
    this.invokeService();
  }


async invokeService(){
 // console.log("Estoy en el llamoServicec y llame al service");
  const listado= await this.dispositivoServ.getListadoDispositivos();
  const valor2= await this.dispositivoServ.getDispositivo(listado[0].dispositivoId);
  console.log('DEBUG: Get device list from services: ');
  this.listadoDispositivo=listado;
  console.log(listado);
}

metodo2(){
  this.dispositivoServ.getListadoDispositivos().then((listado)=>{
    this.dispositivoServ.getDispositivo(listado[0].dispositivoId).then((valor2)=>{
      console.log(valor2);
    });
    this.listadoDispositivo=listado;
    console.log(listado);
  });
}

}
