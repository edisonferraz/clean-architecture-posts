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
import { rejects } from 'assert';
import fetch from 'node-fetch';
import Post from '../../business/domain/post';
import ApiPosts from '../../business/ports/apiPosts';

export default class GraphQLApiPosts implements ApiPosts{

    findAll = async(): Promise<Post[]> => {
        try{
            const query = '{"query":"query { posts { data {id, title, body, user{ id }}}}"}';
            const headers = { 'Content-Type': 'application/json', 'Accept': 'application/json' };
            const options = { method: 'POST', body: query, headers };
            const response = await fetch('https://graphqlzero.almansi.me/api', options);
            const json = await response.json();
            return (json && json.data && json.data.posts && json.data.posts.data) ? json.data.posts.data : [];
        }catch(err){
            console.error(err);
            rejects(err);
        }
    }// findAll()

    findById = async(id: number): Promise<Post> => {
        try{
            const query = `{"query":"query { post(id: ${id}) {id, title, body, user{ id }}}"}`;
            const headers = { 'Content-Type': 'application/json', 'Accept': 'application/json' };
            const options = { method: 'POST', body: query, headers }; 
            const response = await fetch('https://graphqlzero.almansi.me/api', options);
            const json = await response.json();
            if(json && json.data && json.data.post && json.data.post && json.data.post.id){
                const result = json.data.post;
                return new Post(parseInt(result.id), parseInt(result.user.id), result.title, result.body); 
            }
            return null;
        }catch(err){
            console.error(err);
            rejects(err);
        }
    }// findById()

}// GraphQLApiPosts