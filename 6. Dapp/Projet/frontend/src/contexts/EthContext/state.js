const actions = {
  init: 'INIT',
  reset: 'RESET',
};

const initialState = {
  artifact: null,
  provider: null,
  account: null,
  networkID: null,
  contractAddress: null,
  contract: null,
  isAdmin: false,
  isVoter: false,
  workflowStatus: null,
};

const reducer = (state, action) => {
  const { type, data } = action;
  switch (type) {
    case actions.init:
      return { ...state, ...data };
    case actions.reset:
      return { initialState };
    default:
      throw new Error('Undefined reducer action type');
  }
};

export {
  actions,
  initialState,
  reducer,
};
