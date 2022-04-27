import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from '../../models/ingresoEgreso.models';
import { ChartData, ChartEvent, ChartType } from 'chart.js';
import { AppStatewhithIngreso } from '../ingreso-egreso.reducer';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styleUrls: ['./estadistica.component.css']
})
export class EstadisticaComponent implements OnInit {

 ingresos:number =0;
 egresos:number = 0;
 
 totalEgresos:number = 0;
 totalIngresos:number =0;
 data:any[] =[];

 public doughnutChartLabels: string[] = [ 'Ingresos', 'Egresos' ];
 public doughnutChartData: ChartData = {
   labels: this.doughnutChartLabels,
   datasets: []

 };

 public doughnutChartType: ChartType = 'doughnut';


  constructor(private store:Store<AppStatewhithIngreso>) { }

  ngOnInit(): void {
  this.store.select('ingresoEgresos')
  .subscribe(({items}) => this.generarEstadistica(items));
  }

generarEstadistica(items:IngresoEgreso[]){

  this.totalEgresos =0;
  this.totalIngresos =0;
  this.ingresos = 0;
  this.egresos =0;

  for(const item of items){
    if(item.tipo === 'ingreso'){
      this.totalIngresos += item.monto;
      this.ingresos ++;
    }else{
      this.totalEgresos += item.monto;
      this.egresos ++;
    }

  }
this.doughnutChartData.datasets = [{data:[this.totalEgresos,this.totalIngresos]}];
}

}
