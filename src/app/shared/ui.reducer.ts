import { createReducer, on } from '@ngrx/store';
import { isloading,stoploading } from './ui.actions';

export interface State {
    isloading: boolean; 
}

export const initialState: State = {
   isloading: false,
}

const _uiReducer = createReducer(initialState,

  on(isloading, state => ({ ...state, isloading: true })),
  on(stoploading, state => ({ ...state, isloading: false})),

);

export function uiReducer(state:any, action:any) {
    return _uiReducer(state, action);
}