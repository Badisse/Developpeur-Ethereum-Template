import { createContext, Dispatch } from 'react'
import { Action, initialState, State } from './state'

export interface EthContextInterface {
  state: State
  dispatch: Dispatch<Action>
  init: () => Promise<void>
}

const EthContext = createContext<EthContextInterface>({
  state: initialState,
  dispatch: () => null,
  init: async () => await new Promise(resolve => resolve())
})

export default EthContext
