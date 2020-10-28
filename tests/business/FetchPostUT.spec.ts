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
import Post from '../../src/business/domain/post';
import ApiPosts from '../../src/business/ports/apiPosts';
import FetchPosts from '../../src/business/usecases/FetchPosts';
import { getPostsFromBackEnd } from '../stubs/stubsPosts';

describe('FetchPosts UT', () => {

    let fetchPosts: FetchPosts;

    let api = { findAll: null, findById: null } as ApiPosts;

    beforeEach(() => {
        fetchPosts = new FetchPosts(api);
        spyOn(api, 'findAll').and.returnValue(new Promise<Post[]>((accept) => accept(getPostsFromBackEnd())));
        spyOn(api, 'findById').and.callFake((id) => {
            if(id === 1){
                return new Promise<Post>((accept) => accept(getPostsFromBackEnd()[0]));
            }else {
                return new Promise<Post>((accept) => accept(null));
            }
        });
    });

    it('getAllPosts should return all posts with truncated body to 50 caracters terminated by ...', async () => {
        try{
            const posts: Post[] = await fetchPosts.getAllPosts();
            const sizeBodyExpected: number = 50 + '...'.length;
            expect(posts).not.toBeNull();
            expect(posts).toHaveLength(3);
            posts.forEach((post) => {
                expect(post.body.substring(post.body.length - 3)).toBe('...');
                expect(post.body).toHaveLength(sizeBodyExpected);
            });
        }catch(err){
            expect(err).toBeUndefined();
            console.error(err);
        }
    });

    it('findById should throw an error promise when id is undefined', () => {
        fetchPosts.findById(undefined)
            .catch((err) => { 
                expect(err.message).toBe('Post ID is mandatory');
                expect(err.constructor.name).toBe('ArgumentException'); 
            });
    });

    it('findById should throw an error promise when id is null', () => {
        fetchPosts.findById(null)
            .catch((err) => { 
                expect(err.message).toBe('Post ID is mandatory');
                expect(err.constructor.name).toBe('ArgumentException'); 
            });
    });

    it('findById should not throw an error promise when id is 0', async () => {
        try{
            const result = await fetchPosts.findById(0);
            expect(result).toBeNull();
        }catch(err){
            if(err){
                expect(err).toBeUndefined();
                expect(err.message).not.toBe('Post ID is mandatory');
                expect(err.constructor.name).not.toBe('ArgumentException'); 
            }
        }
    });

    it('findById should return null result when id is unknown', async () => {
        try{
            const result = await fetchPosts.findById(2);
            expect(result).toBeNull();
        }catch(err){
            expect(err).toBeUndefined();
            console.error(err);
        }
    });

    it('findById should return sucessfull result when id is 1', async () => {
        try{
            const result = await fetchPosts.findById(1);
            expect(result).not.toBeNull();
            expect(result.id).toBe(1);
            expect(result.title).toBe('sunt aut facere repellat provident occaecati excepturi optio reprehenderit');
            expect(result.userId).toBe(1);
            expect(result.body).toBe('quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto');
        }catch(err){
            console.error(err);
        }
    });

});