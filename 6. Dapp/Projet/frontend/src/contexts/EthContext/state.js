const actions = {
  init: 'INIT',
  updateRole: 'UPDATE_ROLE',
  updateContract: 'UPDATE_CONTRACT',
  loading: 'LOADING',
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
    case actions.init:
      return { ...initialState, ...action.data };
    case actions.updateRole:
      return { ...state, userRole: action.userRole };
    case actions.updateContract:
      return {
        ...state,
        contract: action.data.contract,
        workflowStatus: action.data.workflowStatus,
        loadingState: false,
      };
    case actions.loading:
      return { ...state, loadingState: true };
    default:
      throw new Error('Undefined reducer action type');
  }
};

export {
  actions,
  initialState,
  reducer,
};
