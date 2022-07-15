import axios from "axios"
import { ICompanies } from "../redux/company-reducer"

const url = `shipments.json`

export const instance = axios.create({
    baseURL: url,
})

export const companysAPI = {
    async getCompanys() {
        const response = await instance.get<ICompanies[]>(``)
        return response.data
    }
}
