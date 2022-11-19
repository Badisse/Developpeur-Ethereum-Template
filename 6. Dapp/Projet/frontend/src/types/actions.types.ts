import { IState } from "./state.types"

export interface IAction {
  type: string
  payload?: IState
}