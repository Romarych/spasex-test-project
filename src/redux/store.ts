import { Action, applyMiddleware, combineReducers, compose } from "redux"
import { legacy_createStore as createStore} from 'redux'
import {companyReducer} from './company-reducer'
import thunkMiddleware, { ThunkAction } from "redux-thunk"

let rootReducer = combineReducers({
    sidebar: companyReducer
})

export type InferActionsTypes<T> = T extends {[key: string]: (...args: any[]) => infer U} ? U : never 
export type BaseThunkType<A extends Action, R = Promise<void> | void> = ThunkAction<R, AppStateType, unknown, A>

export type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>

export const store = createStore(rootReducer, compose(applyMiddleware(thunkMiddleware)))

