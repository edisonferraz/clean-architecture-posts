import Post from "../domain/post";

/**
 * I decided to use Promise instead Observable because
 * Observable doesn't belongs (now) to ES6. But, it'll plan
 * to belong for futures versions Javascript. If i use
 * Observable (now), i'll broke clean-architecture because
 * Observable depends of rxjs library...
 * Reminder => The business logic doesn't depends of frameworks or libraries...
 */
export default interface ApiPosts{

    findAll(): Promise<Post[]>;

    findById(id: number): Promise<Post>;

}// ApiPosts