import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Subscription } from 'rxjs';
import { IngresoEgreso } from '../models/ingresoEgreso.models';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  constructor(private firestore: AngularFirestore,
              private AuthService:AuthService) { }



  crearIngresoEgreso(ingresoEgreso:IngresoEgreso){
    //todo
    const uid = this.AuthService.user.uid;
    console.log(ingresoEgreso,uid);
    delete ingresoEgreso.uid;
    return  this.firestore.doc(`${uid}/ingresos-egresos`)
    .collection('items')
    .add({...ingresoEgreso})


  }

  initIngresosEgresosListener(uid:string){
   return this.firestore.collection(`${uid}/ingresos-egresos/items`)
   .snapshotChanges()
    .pipe(
      map( snapshot => snapshot.map( doc => ({
        uid: doc.payload.doc.id,
        ...doc.payload.doc.data() as any
      })
    )
  )
    );
   /*.subscribe(algo =>{
      console.log('informacion');
      console.log(algo);
    })*/

  }

  borrarEgreso(uidItem:string){
    const uid = this.AuthService.user.uid;
    return this.firestore.doc(`${uid}/ingresos-egresos/items/${uidItem}`).delete();
  }
}
