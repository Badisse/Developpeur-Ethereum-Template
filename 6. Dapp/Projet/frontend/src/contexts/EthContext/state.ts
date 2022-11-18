import { ethers } from "ethers"
import { Role } from "../../constants/roles"
import artifact from '../../contracts/Voting.sol/Voting.json'

export interface Action {
  type: string
  payload: {
  artifact?: typeof artifact
  provider?: ethers.providers.Web3Provider | undefined
  signer?: ethers.Signer | undefined
  account?: string | undefined
  networkID?: ethers.providers.Network | undefined
  contract?: ethers.Contract | undefined
  userRole?: Role | undefined
  workflowStatus?: number | undefined
  loading?: boolean
  isVoter?: boolean
  isOwner?: boolean
} | undefined
}

const actions = {
  loading: 'LOADING',
  finished: 'FINISHED',
  init: 'INIT',
  setRole: 'UPDATE_ROLE',
  setContract: 'UPDATE_CONTRACT',
  updateWorkflowStatus: 'UPDATE_WORKFLOW_STATUS'
}

export interface State {
  artifact: typeof artifact
  provider: ethers.providers.Web3Provider | undefined
  signer: ethers.Signer | undefined
  account: string | undefined
  networkID: ethers.providers.Network | undefined
  contract: ethers.Contract | undefined
  userRole: Role | undefined
  workflowStatus: number | undefined
  loading: boolean
  isVoter: boolean
  isOwner: boolean
}

const initialState: State = {
  artifact: artifact,
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

const reducer = (state: State, action: Action): State => {
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
