import { InferActionsTypes, BaseThunkType } from './store'
import { companysAPI } from '../api/api'
import { toast } from 'react-toastify'

export type InitialStateType = typeof initialState
export type CompaniesType = typeof initialState.companies
export type ThunkType = BaseThunkType<ActionsTypes>
type ActionsTypes = InferActionsTypes<typeof actions>

let initialState = {
    companies: [
        {
            id: '',
            name: '',
            email: '',
            boxes: '' as string | null
        }
    ],
    searchQuery: ''
}

export const companyReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'SET_COMPANY':
            return {
                ...state,
                companies: action.payload
            }
        case 'SET_SEARCH_QUERY_COMPANY':
            return {
                ...state,
                searchQuery: action.payload
            }
        default:
            return state
    }
}

export const actions = {
    setCompanies: (companies: CompaniesType) => ({ type: 'SET_COMPANY', payload: companies } as const),
    setSearchQuery: (company: string) => ({ type: 'SET_SEARCH_QUERY_COMPANY', payload: company } as const),
}

export const getCompanies = (): ThunkType => async (dispatch) => {
    let data = await companysAPI.getCompanys()
    dispatch(actions.setCompanies(data))
}

export const getCompaniesStorage = (): ThunkType => (dispatch) => {
    let data = localStorage.getItem('companys')
    if (data) {
        dispatch(actions.setCompanies(JSON.parse(data)))
    } else {
        toast.error('No saved data, download them online')
    }
}

export const saveCompanies = (): ThunkType => (dispatch, getState) => {
    const data = getState().sidebar.companies[0].id == '' ? '' : JSON.stringify(getState().sidebar.companies)
    localStorage.setItem('companys', data)
}

