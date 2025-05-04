import { rxResource } from '@angular/core/rxjs-interop';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CreatePostComponent } from '@core/components/create-post/create-post.component';
import { BlogService } from './blog.service';
import { PostCardComponent } from '@core/components/post-card/post-card.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'blog-page',
  standalone: true,
  imports: [CreatePostComponent, PostCardComponent,RouterOutlet],
  templateUrl: './blog-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogPageComponent {
  private blogService = inject(BlogService);


  public postsResource = rxResource({
    loader:() => this.blogService.findAllPost()
  });
}
