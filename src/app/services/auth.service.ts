import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { subscribeOn, map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.models';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import * as authActions from '../auth/auth.actions';
import { Subscription } from 'rxjs';
import * as ingresosEgresosActios from '../ingreso-egreso/ingreso-egreso.actions';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubscription?:Subscription;
  private _user:Usuario;

  get user(){
    return this._user;
  }

  constructor(public auth: AngularFireAuth,
              private firestore: AngularFirestore,
              private store:Store<AppState>) { 
              }


  initAuthListener() {

    this.auth.authState.subscribe(
      fuser => {
        if(fuser){   

       this.userSubscription = this.firestore.doc(`${fuser.uid}/usuario`).valueChanges()
        .subscribe((firestoreUser:any) =>{

          console.log({firestoreUser});
        
          const user = Usuario.fromFirebase(firestoreUser);
          this._user= user;
          this.store.dispatch(authActions.setUser({user}));
          

        });

      }else{
       
        if(this.userSubscription === undefined){
          return;
        }
        this._user = null;
        this.userSubscription.unsubscribe();
        this.store.dispatch(authActions.unsetUser());
        this.store.dispatch(ingresosEgresosActios.UnsetItems());
      }

    //    this.store.dispatch(authActions.setUser({}))

      }
    )
}


  crearusuario(nombre: string, email: string, password: string) {
    
  //  console.log(nombre, email, password);
    return this.auth.createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
         
        const newUser = new Usuario(user.uid, nombre, user.email);
        return this.firestore.doc(`${user!.uid}/usuario`).set({...newUser});


      });
    
      
    
  }

  LoginUsuario(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
  return  this.auth.signOut();
  }

  isAuth() {
    return this.auth.authState.pipe(
      map(fbUser => fbUser != null)
    );
  }

}
