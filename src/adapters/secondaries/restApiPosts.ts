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
import fetch from 'node-fetch';
import Post from '../../business/domain/post';
import ApiPosts from '../../business/ports/apiPosts';

export default class RestApiPosts implements ApiPosts{

    findAll = async(): Promise<Post[]> => {
        try{
            const response = await fetch('https://jsonplaceholder.typicode.com/posts');
            const json = await response.json();
            return json;
        }catch(err){
            console.error(err);
            throw err;
        }
    }// findAll()

    findById = async(id: number): Promise<Post> => {
        try{
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts?id=${id}`);
            const json = await response.json();
            return json[0] || null;
        }catch(err){
            console.error(err);
            throw err;
        }
    }// findById()

}// RestApiPosts