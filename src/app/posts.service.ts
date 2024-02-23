import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Post } from "./Post.model";
import { map } from "rxjs";

@Injectable({ providedIn: 'root' })
export class PostsService {
    constructor(private http: HttpClient) { }

    createAndStorePost(postData: Post) {
        return this.http.post<{ name: string }>('https://manthan-angular-example-default-rtdb.firebaseio.com/posts.json',
            postData,
            { headers: new HttpHeaders({ "Custom-Header": "Hello" }),observe:'response' })
    }


    fetchPost() {

        return this.http.get<{ [key: string]: Post }>('https://manthan-angular-example-default-rtdb.firebaseio.com/posts.json',
            {
                headers: new HttpHeaders({ "Custom-Header": "Hello" }),
                params : new HttpParams().set('print','preeety ')
            }
        ).pipe(map((responseData: { [key: string]: Post }) => {
            const postArray: Post[] = [];
            // console.log(responseData);
            for (const key in responseData) {
                if (responseData.hasOwnProperty(key)) {

                    postArray.push({ ...responseData[key], id: key });
                }
            }
            return postArray
        }))
    }

    deletePost(id: string) {
        return this.http.delete(`https://manthan-angular-example-default-rtdb.firebaseio.com/posts/${id}.json`);
    }
    updatePost(data:Post | null,id:string|null){
        return this.http.put(`https://manthan-angular-example-default-rtdb.firebaseio.com/posts/${id}.json`,data);
    }
}