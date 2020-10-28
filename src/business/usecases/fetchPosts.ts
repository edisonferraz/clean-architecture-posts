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
import Post from '../domain/post';
import ApiPosts from '../ports/apiPosts';
import ArgumentException from '../exceptions/argumentException';

export default class FetchPosts{

    /**
     * Size body truncated
     */
    private sizeBody: number;
    
    constructor(private api: ApiPosts){
      this.sizeBody = 50;
    }// constructor

    /**
     * Find all posts and truncate their body to
     * 50 caracters max followed by ...
     * @return Promise<Post[]>
     */
    async getAllPosts(): Promise<Post[]> {
      const postsFromApi = await this.api.findAll();
      return postsFromApi.map(post => ({...post, body: `${post.body.substring(0, this.sizeBody)}...` }));
    }// getAllPosts()

    async findById(id: number): Promise<Post> {
      if(id === undefined && id === null){
        return new Promise((accept, reject) => reject(new ArgumentException('Post ID is mandatory')));
      }
      return this.api.findById(id);
    }// findById()

}// FetchPosts