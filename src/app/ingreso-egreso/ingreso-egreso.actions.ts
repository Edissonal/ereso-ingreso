import { createAction, props } from '@ngrx/store';
import { IngresoEgreso } from '../models/ingresoEgreso.models';

export const UnsetItems = createAction('[IngresoEgreso Component] unset Items');
export const setItems = createAction('[IngresoEgreso Component] set Items',
                                     props<{items:IngresoEgreso[]}>()
                                    );