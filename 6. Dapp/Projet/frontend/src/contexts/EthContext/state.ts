/*[object Object]*/
import artifact from '../../contracts/Voting.sol/Voting.json'
import { IAction } from '../../types/actions.types'
import { IState } from '../../types/state.types'



const actions = {
  loading: 'LOADING',
  finished: 'FINISHED',
  init: 'INIT',
  setRole: 'UPDATE_ROLE',
  setContract: 'UPDATE_CONTRACT',
  updateWorkflowStatus: 'UPDATE_WORKFLOW_STATUS'
}

const initialState: IState = {
  artifact,
  provider: undefined,
  signer: undefined,
  account: undefined,
  networkID: undefined,
  contract: undefined,
  userRole: undefined,
  workflowStatus: undefined,
  loading: false,
  isVoter: false,
  isOwner: false
}

const reducer = (state: IState, action: IAction): IState => {
  const { type, payload } = action

  switch (type) {
    case actions.loading:
      return { ...state, loading: true }
    case actions.finished:
      return { ...state, loading: false }
    case actions.init:
      return { ...initialState, ...payload, loading: false }
    case actions.setRole:
      return { ...state, ...payload }
    case actions.setContract:
      return {
        ...state,
        ...payload,
        loading: false
      }
    case actions.updateWorkflowStatus:
      return {
        ...state,
        ...payload,
        loading: false
      }
    default:
      throw new Error('Undefined reducer action type')
  }
}

export {
  actions,
  initialState,
  reducer
}
