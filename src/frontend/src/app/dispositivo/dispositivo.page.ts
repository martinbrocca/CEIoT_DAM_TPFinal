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
declare var require: any;
require('highcharts/highcharts-more')(Highcharts);
require('highcharts/modules/solid-gauge')(Highcharts);

@Component({
  selector: 'app-dispositivo',
  templateUrl: './dispositivo.page.html',
  styleUrls: ['./dispositivo.page.scss'],
})
export class DispositivoPage implements OnInit {
  public disp: Dispositivo;
  estadoEV: boolean;
  private lecturaEV: number;
  public myChart;
  private chartOptions;

  constructor(private router: ActivatedRoute, private dSrv: DispositivoService, private medSrv: MedicionService, private lSrv: LogsService, private evSrv: ElectrovalvulaService) { }

  ngOnInit(): void {
    let idDisp = this.router.snapshot.paramMap.get('id');
    this.disp = this.dSrv.getDispositivo(idDisp);
    this.estadoEV = Boolean(this.evSrv.getEstadoActualEV(this.disp.electrovalvulaId));
    console.log("ID= " + idDisp + " -- disp = " + this.disp + " -- estado Ev = " + this.estadoEV);
    console.log("medServ = "+ this.medSrv.getUltimaMedicionDispositivo(idDisp));
    this.lecturaEV = this.medSrv.getUltimaMedicionDispositivo(idDisp).valor;
  }
  cambiarEstadoEV() {
    this.estadoEV = !this.estadoEV;
    console.log('La electrovalvula del dispositivo' + this.disp.nombre + ' esta ' + this.estadoEV);
    let log: Logs = new Logs(0, new Date(), Number(this.estadoEV), this.disp.electrovalvulaId);
    this.lSrv.newEntrada(log);
  }
  ionViewDidEnter() {
    this.generarChart();
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
          text: [this.disp.nombre]
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
            text: 'Cb kPa'
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
        data: [this.lecturaEV],
        tooltip: {
            valueSuffix: ' Cb'
        }
    }]
    };
    this.myChart = Highcharts.chart('highcharts', this.chartOptions );
  }
}
