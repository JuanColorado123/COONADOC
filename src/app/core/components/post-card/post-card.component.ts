import { DatePipe, SlicePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BlogService } from '@pages/blog/blog.service';
import { Post } from 'src/app/interfaces/Post';

@Component({
  selector: 'core-post-card',
  imports: [DatePipe, RouterLink, SlicePipe],
  templateUrl: './post-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostCardComponent implements OnInit {

  public postInput = input.required<Post>();
  public index = input.required<number>();

  private blogService = inject(BlogService);

  public post = signal<Post | null>(null);

  ngOnInit(): void {
    this.post.set(this.postInput());
  }

  public likeCount(): void {
    const currentPost = this.post();
    if (!currentPost || !currentPost.id) return;

    const currentId = currentPost.id;

    this.blogService.likePostById(currentId).subscribe({
      next: () => {
        if (currentPost) {
          currentPost.likeCount = (currentPost.likeCount || 0) + 1;
          this.post.update(() => currentPost);
        }
      },
      error: (error) => {
        console.error('Error al agregar me gusta', error);
      }
    });
  }

  public viewCount(): void {
    const currentPost = this.post();
    if (!currentPost || !currentPost.id) return;

    const currentId = currentPost.id

    this.blogService.viewCountById(currentId).subscribe({
      next: () => {
        if (currentId) {
          currentPost.viewCount = (currentPost.viewCount || 0) + 1
          this.post.update(() => currentPost);
        }
      },
      error: (error) => {
        console.error('Error al agregar el visto');
      }
    })
  }
}
