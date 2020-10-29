import React from 'react';
import { Link } from 'react-router-dom';
import FetchPosts from '../../../../../business/usecases/FetchPosts';
import { getInstanceApi } from '../../../../secondaries/factoryApiPosts';

import './style.scss';

export default class FullPostComponent extends React.Component{

    constructor(props){
        super(props);
        this.api = new FetchPosts(getInstanceApi());
        this.state = {
            post: null
        };
    }// constructor()

    componentDidMount = async () => {
        const id = this.props.match.params.id;
        const post = await this.api.findById(id);
        this.setState({ post });
    }

    render = () => (<article id="post">
                <h1 id="post-title">{this.state.post && this.state.post.title}</h1>
                <p id="post-content">{this.state.post && this.state.post.body}</p>
                <Link className="btn" to='/'>Retour</Link>
        </article>)

}// FullPostComponent()