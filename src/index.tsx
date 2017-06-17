import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import * as ReduxPromise from 'redux-promise';

import reducers from './reducers';

import PostsIndex from './components/posts_index'
import PostsNew from './components/posts_new'
import PostsShow from './components/posts_show'

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

class Hello extends React.Component<any,any> {
  render() {
    return (
    
    <BrowserRouter>
      <div>
        Hello
        <Route exact path="/" component={PostsIndex} />
        <Route path="/hello/blah" component={Hello2}/>
      </div>
    </BrowserRouter>)
  }
}

class Hello2 extends React.Component<any,any> {
  render() {
    return (<div>Hello2!</div>)
  }
}

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/posts/new" component={PostsNew} />
          <Route path="/posts/:id" component={PostsShow} />
          <Route path="/" component={PostsIndex} />
        </Switch>
        <Route path="/hello" component={Hello}/>
        <Route path="/hello2" component={Hello2}/>
      </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));
