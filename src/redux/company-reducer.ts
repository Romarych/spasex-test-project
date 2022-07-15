import { AppDispatch, AppState } from './store'
import { companysAPI } from '../api/api'
import { toast } from 'react-toastify'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ICompanies {
    id: string
    name: string
    email: string
    boxes: string | null
}

interface IState {
    companies: ICompanies[]
    searchQuery: string
}

let initialState: IState = {
    companies: [],
    searchQuery: ''
}

export const companySlice = createSlice({
    name: 'company',
    initialState,
    reducers: {
        setCompanies(state, action: PayloadAction<ICompanies[]>) {
            state.companies = action.payload
        },
        setSearchQuery(state, action: PayloadAction<string>) {
            state.searchQuery = action.payload
        },
        updateBoxes(state, action: PayloadAction<{ id: string, boxes: string }>) {
            state.companies = state.companies.map(company => company.id === action.payload.id ? { ...company, boxes: action.payload.boxes } : company)
        }
    },
})

export const getCompanies =  () => async (dispatch: AppDispatch) => {
    let data = await companysAPI.getCompanys()
    dispatch(companySlice.actions.setCompanies(data))
}

export const getCompaniesStorage = () => (dispatch: AppDispatch) => {
    let data = localStorage.getItem('companys')
    data ? dispatch(companySlice.actions.setCompanies(JSON.parse(data)))
        : toast.error('No saved data, download them online')
}

export const saveCompanies = () => (dispatch: AppDispatch, getState: () => AppState) => {
    const data = !getState().companyReducer.companies[0] ? ''
        : JSON.stringify(getState().companyReducer.companies)
    localStorage.setItem('companys', data)
}

export default companySlice.reducer