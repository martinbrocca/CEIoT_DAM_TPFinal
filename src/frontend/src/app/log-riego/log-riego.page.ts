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

  constructor(private router: ActivatedRoute, private dServ: DispositivoService, private lServ: LogsService) { }

  ngOnInit() {
    let idDispositivo = this.router.snapshot.paramMap.get('id');
    this.dispositivo = this.dServ.getDispositivo(idDispositivo);
    this.logs = this.lServ.getLogsValvula(this.dispositivo.electrovalvulaId);
  }

}
