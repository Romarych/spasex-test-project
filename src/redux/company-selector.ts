import { AppStateType } from "./store"

export const getCompaniesSelector = (state: AppStateType) => {
    return state.sidebar.companies.filter(company => 
        company.name.toLowerCase()
        .indexOf(state.sidebar.searchQuery.toLowerCase()) >= 0 )
}

export const getSearchQuerySelector = (state: AppStateType) => {
    return state.sidebar.searchQuery
}