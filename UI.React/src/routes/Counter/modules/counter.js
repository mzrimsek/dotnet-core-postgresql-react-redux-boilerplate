export const COUNTER_INCREMENT = 'COUNTER_INCREMENT';

export function increment(value = 1){
  return{
    type: COUNTER_INCREMENT,
    payload: value
  };
}
export const doubleAsync = () => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        dispatch(increment(getState().counter));
        resolve();
      }, 200);
    });
  };
}

export const actions = {
  increment,
  doubleAsync
};
const ACTION_HANDLERS = {
    [COUNTER_INCREMENT]: (state, action) => state + action.payload
};

const initialState = 0;
export default function counterReducer(state = initialState, action){
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state;
}