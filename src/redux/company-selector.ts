import { AppState } from "./store"

export const getCompaniesSelector = (state: AppState) => {
    return state.companyReducer.companies.filter(company => 
        company.name.toLowerCase()
        .indexOf(state.companyReducer.searchQuery.toLowerCase()) >= 0 )
}

export const getSearchQuerySelector = (state: AppState) => {
    return state.companyReducer.searchQuery
}