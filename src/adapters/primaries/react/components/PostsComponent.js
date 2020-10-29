import React from 'react';
import FetchPosts from '../../../../business/usecases/FetchPosts';
import { getInstanceApi } from '../../../secondaries/factoryApiPosts';
import PostComponent from './PostComponent/PostComponent';

import './common.scss';

export default class PostsComponent extends React.Component{

    constructor(props){
        super(props);
        this.api = new FetchPosts(getInstanceApi());
        this.state = {
            posts: [],
        };
    }

    componentDidMount = async () => {
        const posts = await this.api.getAllPosts();
        this.setState({ posts });
    }

    render = () => (<section id="posts">
        { this.state.posts.map(post => <PostComponent key={post.id} id={post.id} body={post.body} title={post.title}  />) }
    </section>)

}// PostsComponent()