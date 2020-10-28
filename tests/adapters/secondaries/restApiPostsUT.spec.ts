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
import { expect, describe, beforeEach, it } from '@jest/globals';

import RestApiPosts from '../../../src/adapters/secondaries/restApiPosts';
import Post from '../../../src/business/domain/post';

describe('Rest API Posts UT', () => {

    let apiPosts: RestApiPosts;

    beforeEach(() => {
        apiPosts = new RestApiPosts();
    });

    it('findAll should return all posts from Rest API', async () => {
        try{
            const posts: Post[] = await apiPosts.findAll();
            expect(posts).not.toBeNull();
            expect(posts).toHaveLength(100);
        }catch(err){
            expect(err).toBeUndefined();
            console.error(err);
        }
    });

    it('findById should return a successful post from Rest API when id equals to 1', async () => {
        try{
            const post: Post = await apiPosts.findById(1);
            expect(post).not.toBeNull();
            expect(post.id).toBe(1);
        }catch(err){
            expect(err).toBeUndefined();
            console.error(err);
        }
    });

    it('findById should return a null result from Rest API when id is unknown', async () => {
        try{
            const post: Post = await apiPosts.findById(999999);
            expect(post).toBeNull();
        }catch(err){
            expect(err).toBeUndefined();
            console.error(err);
        }
    });

});