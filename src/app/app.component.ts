import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { Post } from './Post.model';
import { catchError, map, throwError } from 'rxjs';
import { PostsService } from './posts.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  loadedPost: Post[] = [];
  isFetching = false;
  error = null;
  id: string | null = null;
  title: string | null = null;
  description: string | null = null;
  postbtn = true;
  updatebtn= false;
  ngOnInit(): void {
    this.onFetchPost();
  }
  constructor(private http: HttpClient, private postService: PostsService) { }

  onCreatePost(postData: Post) {
    console.log(postData);
    
    this.postService.createAndStorePost(postData).subscribe(
      (responseData => {
        console.log(responseData);
        this.title = "";
        this.description = "";
        this.onFetchPost();
      })
      );
  }

  onFetchPost() {
    this.isFetching = true;
    this.postService.fetchPost().subscribe((getPostData) => {
      console.log(getPostData);
      this.loadedPost = getPostData;
      console.log(this.loadedPost.forEach(e=>{
        console.log(e.descriptions);
        
      }));
      
      this.isFetching = false;
    })

  }

  onDeletePost(id: string) {
    this.postService.deletePost(id).subscribe(
      (data) => {
        this.onFetchPost();
      }
    );
  }
  onEditPost(data: Post) {
    this.postbtn= false;
    this.updatebtn=true;
    this.title = data.titles
    this.description = data.descriptions
    this.id = data.id!;
  }

  onUpdatePost(updatedData: Post | null) {
    this.postService.updatePost(updatedData, this.id).subscribe((data) => {
      this.onFetchPost();
   
      this.postbtn= true;
    this.updatebtn=false;
    });

  }
}
