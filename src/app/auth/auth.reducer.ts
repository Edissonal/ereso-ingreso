import { user } from '@angular/fire/auth';
import { createReducer, on } from '@ngrx/store';
import { setUser,unsetUser } from './auth.actions';
import { Usuario } from '../models/usuario.models';


export interface State {
    user: Usuario; 
}

export const initialState: State = {
   user: null,
}

const _authReducer = createReducer(initialState,

    on(setUser, (state,{user}) => ({ ...state,user: {...user}})),
    on(unsetUser, state => ({ ...state,user: null})),

);

export function authReducer(state:any, action:any) {
    return _authReducer(state, action);
}