const actions = {
  init: 'INIT',
  updateRole: 'UPDATE_ROLE',
};

const initialState = {
  artifact: null,
  provider: null,
  account: null,
  networkID: null,
  contractAddress: null,
  contract: null,
  userRole: null,
  workflowStatus: null,
};

const reducer = (state, action) => {
  const { type, data } = action;
  switch (type) {
    case actions.init:
      return { ...state, ...data };
    case actions.updateRole:
      return { ...state, ...data };
    default:
      throw new Error('Undefined reducer action type');
  }
};

export {
  actions,
  initialState,
  reducer,
};
