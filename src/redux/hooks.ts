import { useSelector, TypedUseSelectorHook, useDispatch } from "react-redux"
import { AppDispatch, AppState } from "./store"

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector