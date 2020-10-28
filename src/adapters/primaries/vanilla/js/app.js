/*
 * Copyright 2020 Yassine AZIMANI
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import FetchPosts from "../../../../business/usecases/FetchPosts";

import '../css/common.scss';
import '../css/app.scss';
import '../css/post.scss';
import { getInstanceApi } from '../../../secondaries/factoryApiPosts';

const api = new FetchPosts(getInstanceApi());

const renderPosts = (posts) => {
    if(!posts){
        return '';
    }
    const tmp = posts.map(post => `<div class="post"><h2>${post.title}</h2><p>${post.body}</p><a class="btn btn-read-more" href="post.html?id=${post.id}">Read more</a></div>`);
    return tmp.join('');
};// renderPosts()

const loadPosts = async () => {
    const posts = await api.getAllPosts();
    if(posts){
        const postsElement = document.getElementById('posts');
        postsElement.innerHTML = renderPosts(posts);
    }
};// loadPosts()

const loadPost = async (id) => {
    const post = await api.findById(id);
    if(post){
        const titleElement = document.getElementById('post-title');
        const contentElement = document.getElementById('post-content');
        if(titleElement){
            titleElement.innerText = post.title;
        }
        if(contentElement){
            contentElement.innerText = post.body;
        }
    }
};// loadPost()

const main = () => {
    document.addEventListener("DOMContentLoaded", function(event) { 
        if(window.location.pathname === '/'){
            loadPosts();
        }
        else if(window.location.pathname === '/post.html'){
            const id = window.location.search.split('=')[1];
            loadPost(id);
        }
    });
};// main()

main();

