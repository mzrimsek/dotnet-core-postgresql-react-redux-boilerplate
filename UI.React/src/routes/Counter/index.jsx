import { injectReducer } from '../../store/reducers';

export default(store) => ({
  path: 'counter',
  getComponent(nextState, callback){
    require.ensure([], (require) => {
      const Counter = require('./containers/CounterContainer').default;
      const reducer = require('./modules/counter').default;
      
      injectReducer(store, { key: 'counter', reducer });
      callback(null, Counter);
    }, 'counter');
  }
});