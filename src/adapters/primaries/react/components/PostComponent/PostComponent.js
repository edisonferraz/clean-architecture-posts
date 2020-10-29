import React from 'react';
import { Link } from 'react-router-dom';

import './style.scss';

export default class PostComponent extends React.Component{

    render = () => (<div className="post">
            <h2>{this.props.title}</h2>
            <p>{this.props.body}</p>
            <Link className="btn btn-read-more" to={`post/${this.props.id}`}>Read more</Link>
        </div>)

}// PostComponent()