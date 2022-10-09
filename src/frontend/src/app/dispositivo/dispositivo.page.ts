/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable prefer-const */
/* eslint-disable max-len */
import { Component, OnInit } from '@angular/core';
import { Dispositivo } from '../model/dispositivo';
import { DispositivoService } from '../services/dispositivo.service';
import * as Highcharts from 'highcharts';
import { LogsService } from '../services/logRiegos.service';
import { Logs } from '../model/logRiegos';
import { ElectrovalvulaService } from '../services/electrovalvula.service';
import { MedicionService } from '../services/medicion.service';
import { ActivatedRoute } from '@angular/router';
import { Medicion } from '../model/medicion';


declare var require: any;
require('highcharts/highcharts-more')(Highcharts);
require('highcharts/modules/solid-gauge')(Highcharts);

@Component({
  selector: 'app-dispositivo',
  templateUrl: './dispositivo.page.html',
  styleUrls: ['./dispositivo.page.scss'],
})
export class DispositivoPage implements OnInit {
  public dispositivo: Dispositivo;
  public estadoEV = false;
  public myChart;
  private chartOptions;
  public medicion: Medicion;
  public idDispositivo: string;
  public onError: boolean;
  public onEVError: boolean;
  private chartValue = 0;
  private chartName = '';
  constructor(private router: ActivatedRoute, private dispService: DispositivoService, private medSrv: MedicionService, private lSrv: LogsService, private evSrv: ElectrovalvulaService) {

  }

  ngOnInit() {

    this.getDispositivoData();
   // this.generarChart();

  }

  async getDispositivoData() {
    this.idDispositivo = this.router.snapshot.paramMap.get('id');

    try {
      this.onError= false;
      //console.log('DEBUG: Entered dispositivo page');
      let dipositivo = await this.dispService.getDispositivo(this.idDispositivo);
      this.dispositivo=dipositivo;
      //console.log(this.dispositivo);
      console.log('DEBUG: dispositivo page, got deviceID: ' +this.idDispositivo + ' got device: ' + this.dispositivo.nombre);
      let med = await this.medSrv.getMedicionByIdDispositivo(this.idDispositivo);
      this.medicion=med;
      console.log('DEBUG: got mediciones for device: ' + this.dispositivo.nombre + ' - med: '+ this.medicion.valor);
      this.chartValue = Number(this.medicion.valor);
      this.chartName = String(this.dispositivo.nombre);
      this.generarChart();
  }
  catch (error) {
    this.onError = true;
    console.log('ERROR" not able to fetch data: ' + error);
  }
  try {
    this.onEVError = false;
    this.estadoEV =  Boolean( await this.evSrv.getEstadoActualEV(this.dispositivo.electrovalvulaId));
    console.log('DEBUG: EV State for: ' + this.dispositivo.nombre + ' EV_Id: '+ this.dispositivo.electrovalvulaId +' - state: '+  this.estadoEV);
  }
  catch (error) {
    this.onEVError = true;
    console.log('ERROR" not able to fetch data for EV: ' + error);
  }

  }

  cambiarEstadoEV() {
    this.estadoEV = !this.estadoEV;
    let estadoEVn = Number(this.estadoEV);
    let now = new Date();
    console.log('La electrovalvula del dispositivo' + this.dispositivo.nombre + ' esta ' + this.estadoEV + ' en numeros:  ' + estadoEVn);
    let log: Logs = new Logs(0,  Number(this.estadoEV), now , this.dispositivo.electrovalvulaId);
    this.lSrv.newEntrada(log);
    // If I close the EV, then I need also to push a Medicion record.
    if (!this.estadoEV){
      let newMedicion =  this.getRandomInt(0,100);
      let med: Medicion = new Medicion(0, now, newMedicion, this.dispositivo.dispositivoId);
      this.medSrv.agregarMedicion(med);
      this.chartValue = Number(newMedicion);
      this.generarChart();
      console.log('DEBUG: - New chartValue as per closing valve is ' + newMedicion + ' ' + this.chartValue);
    }
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }

   generarChart() {
    this.chartOptions={
      chart: {
          type: 'gauge',
          plotBackgroundColor: null,
          plotBackgroundImage: null,
          plotBorderWidth: 0,
          plotShadow: false,
          height: '300px'
        }
        ,title: {
          // text: [String(this.dispositivo.nombre)]
          text: [String(this.chartName)]
        }
        ,credits:{enabled:false}
        ,pane: {
            startAngle: -150,
            endAngle: 150,

            center: ['50%', '50%'],
            size: '100%'
        }
        // the value axis
      ,yAxis: {
        min: 0,
        max: 100,

        minorTickInterval: 'auto',
        minorTickWidth: 1,
        minorTickLength: 10,
        minorTickPosition: 'inside',
        minorTickColor: '#666',

        tickPixelInterval: 30,
        tickWidth: 2,
        tickPosition: 'inside',
        tickLength: 10,
        tickColor: '#666',
        labels: {
            step: 2,
            rotation: 'auto'
        },
        title: {
            text: 'Humedad de Suelo'
        },
        plotBands: [{
            from: 0,
            to: 10,
            color: '#000000' // black
        }, {
            from: 10,
            to: 30,
            color: '#55BF3B' // green
        }, {
            from: 30,
            to: 60,
            color: '#DDDF0D' // yellow
        }, {
            from: 60,
            to: 100,
            color: '#DF5353' // red
        }]
    }
    ,
    series: [{
        name: 'Cb',
        data: [this.chartValue],
        // data: [Number(this.medicion.valor)],
        tooltip: {
            valueSuffix: ' kPa'
        }
    }]
    };
   // console.log('DEBUG: Highcharts: valor: '+ this.medicion.valor + ' dispositivo: '  + this.dispositivo.nombre);
    this.myChart = Highcharts.chart('highcharts', this.chartOptions );
  }
}
