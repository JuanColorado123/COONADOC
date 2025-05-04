import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Post } from '../../interfaces/Post';
import { delay, map, Observable, tap } from 'rxjs';
import { Comment, CommentLike } from 'src/app/interfaces/Comment';

const BASIC_URL = 'http://localhost:8080/blog-api'

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private http = inject(HttpClient);

  findAllPost(): Observable<Post[]> {
    return this.http.get<Post[]>(`${BASIC_URL}/posts`);
  }

  findPostById(id: string): Observable<Post> {
    return this.http.get<Post>(`${BASIC_URL}/post/${id}`)
  }

  likePostById(id: number): Observable<any> {
    return this.http.put(`${BASIC_URL}/post/me-gusta/${id}`,{
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  viewCountById(id: number): Observable<any>{
    return this.http.put(`${BASIC_URL}/post/visto/${id}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  createNewPost(post: Partial<Post>): Observable<Post> {
    return this.http.post<Post>(`${BASIC_URL}/post/crear`, post);
  }

  createCommentByPost(comment: Partial<CommentLike>): Observable<Comment>{
    return this.http.post<Comment>(`${BASIC_URL}/comentario-agregar`,comment)
  }

  findCommentByIdPost(id: number):Observable<Comment[]>{
    return this.http.get<Comment[]>(`${BASIC_URL}/comentarios/${id}`);
  }
}
