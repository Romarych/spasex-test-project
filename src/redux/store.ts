import { combineReducers, configureStore } from "@reduxjs/toolkit"
import companyReducer from './company-reducer'

let rootReducer = combineReducers({
    companyReducer
})

export const store = configureStore({
    reducer: rootReducer
})

export const setupStore = () => store

export type AppState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']

