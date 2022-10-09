/* eslint-disable prefer-const */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dispositivo } from '../model/Dispositivo';
import { Logs } from '../model/logRiegos';
import { DispositivoService } from '../services/dispositivo.service';
import { LogsService } from '../services/logRiegos.service';

@Component({
  selector: 'app-log',
  templateUrl: './log-riego.page.html',
  styleUrls: ['./log-riego.page.scss'],
})
export class LogRiegoPage implements OnInit {

  public dispositivo: Dispositivo;
  public logs:  Array<Logs>;
  public idDispositivo: string;
  public onError: boolean;

  constructor(private router: ActivatedRoute, private dispService: DispositivoService, private lServ: LogsService) { }

  ngOnInit() {

    this.getLogsData();
  }


  async getLogsData() {
    this.idDispositivo = this.router.snapshot.paramMap.get('id');
    try {
      console.log('DEBUG: Entered Logs page');
      let disp = await this.dispService.getDispositivo(this.idDispositivo);
      this.dispositivo=disp;
      //console.log(this.dispositivo);
       console.log('DEBUG: Logs  page, got deviceID: ' +this.idDispositivo + ' got device: ' + this.dispositivo.nombre);
      let log = await this.lServ.getLogsValvula(this.dispositivo.electrovalvulaId);
        this.logs=log;
   // console.log('DEBUG: got mediciones for device: ' + this.dispositivo + ' - med: '+ this.medicion);
      this.onError= false;
  }
  catch (error) {
    this.onError = true;
    console.log('ERROR" not able to fetch logs: ' + error);
  }
  }

}
