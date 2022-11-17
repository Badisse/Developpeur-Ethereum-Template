const actions = {
  loading: 'LOADING',
  init: 'INIT',
  setRole: 'UPDATE_ROLE',
  setContract: 'UPDATE_CONTRACT',
  updateWorkflowStatus: 'UPDATE_WORKFLOW_STATUS',
};

const initialState = {
  artifact: null,
  provider: null,
  signer: null,
  account: null,
  networkID: null,
  contract: null,
  userRole: null,
  workflowStatus: null,
  loadingState: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case actions.loading:
      return { ...state, loadingState: true };
    case actions.init:
      return { ...initialState, ...action.data, loadingState: false };
    case actions.setRole:
      return { ...state, userRole: action.userRole };
    case actions.setContract:
      return {
        ...state,
        contract: action.data.contract,
        workflowStatus: action.data.workflowStatus,
        loadingState: false,
      };
    case actions.updateWorkflowStatus:
      return {
        ...state,
        workflowStatus: action.workflowStatus,
        loadingState: false,
      };
    default:
      throw new Error('Undefined reducer action type');
  }
};

export {
  actions,
  initialState,
  reducer,
};
