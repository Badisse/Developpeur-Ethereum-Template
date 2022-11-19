import { Dispatch } from "react"
import { IAction } from "./actions.types"
import { IState } from "./state.types"

export interface IEthContextInterface {
  state: IState
  dispatch: Dispatch<IAction>
  init: () => Promise<void>
}