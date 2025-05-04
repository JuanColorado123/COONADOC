import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BlogService } from '../blog.service';
import { ActivatedRoute } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { DatePipe } from '@angular/common';
import { CommentPostComponent } from '@core/components/comment-post/comment-post.component';

@Component({
  selector: 'post-details',
  imports: [DatePipe, CommentPostComponent],
  templateUrl: './post-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostDetailsComponent {

  private blogService = inject(BlogService);
  private activeRoute = inject(ActivatedRoute);

  private id = this.activeRoute.snapshot.paramMap.get('id')

  public postResource = rxResource({
    request:() => ({id: this.id}),
    loader:({request}) => this.blogService.findPostById(request.id!)
  })
}
