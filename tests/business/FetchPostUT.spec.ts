import Post from '../../src/business/domain/post';
import FetchPosts from '../../src/business/usecases/FetchPosts';
import { getPostsExpected } from '../stubs/stubsPosts';

describe('FetchPosts UT', () => {

    let fetchPosts: FetchPosts;

    beforeEach(() => {
        fetchPosts = new FetchPosts();
    });

    it('getAllPosts should return all posts with truncated body to 50 caracters terminated by ...', () => {
        const posts: Post[] = fetchPosts.getAllPosts();
        expect(posts).not.toBeNull();
        expect(posts).toHaveLength(3);
    });
});