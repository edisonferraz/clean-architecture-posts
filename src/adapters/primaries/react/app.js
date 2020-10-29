import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import FullPostComponent from './components/FullPostComponent/FullPostComponent';
import PostsComponent from './components/PostsComponent';

export default class App extends React.Component{

    render = () => (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={props => <PostsComponent {...props} />} />
                <Route exact path="/posts" component={props => <PostsComponent {...props} />} />
                <Route exact path="/post/:id" component={ props => <FullPostComponent {...props} />} />
            </Switch>
        </BrowserRouter>
    );

}// App