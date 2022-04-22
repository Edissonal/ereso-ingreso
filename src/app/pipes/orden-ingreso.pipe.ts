import { Pipe, PipeTransform } from '@angular/core';
import { IngresoEgreso } from '../models/ingresoEgreso.models';

@Pipe({
  name: 'ordenIngreso'
})
export class OrdenIngresoPipe implements PipeTransform {

  transform(items: IngresoEgreso[]): IngresoEgreso[] {

    return items.slice().sort((a,b) =>{
    
      if(a.tipo === 'ingreso'){
        return -1;
      }else{
        return 1;
      }

    });
  }

}
