import { createStore, compose, applyMiddleware } from 'redux';

export default (reducers, middlewares) => {
  // applying Reactotron
  const enhancer =
    process.env.NODE_ENV === 'development'
      ? compose(
          console.tron.createEnhancer(), // integration REdux + Reactotron
          applyMiddleware(...middlewares)
        )
      : applyMiddleware(...middlewares);

  return createStore(reducers, enhancer);
};
