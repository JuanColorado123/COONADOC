import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { BlogService } from '@pages/blog/blog.service';
import { CommentLike } from 'src/app/interfaces/Comment';

@Component({
  selector: 'core-comment-post',
  imports: [ReactiveFormsModule,DatePipe],
  templateUrl: './comment-post.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentPostComponent {

  private fb = inject(FormBuilder);
  private blogService = inject(BlogService);
  public postId = input.required<number>();

  public showSuccess = signal(false);
  private initialFormState = {
    postedBy: '',
    comment: ''
  };

  public commentForm = this.fb.group({
    postedBy: ['',Validators.required],
    comment: ['', [Validators.required,Validators.maxLength(5000)]]
  })

  public commentResource = rxResource({
    request: () => ({id: this.postId()}),
    loader:({request}) => this.blogService.findCommentByIdPost(request.id)
  })
  public onSubmit(): void{

    this.commentForm.markAllAsTouched()
    if(this.commentForm.invalid) return;

    const formValue = {
      postedBy: this.commentForm.value.postedBy,
      comment: this.commentForm.value.comment,
      post: {id: this.postId()}
    }
    console.log({formValue});

    this.blogService.createCommentByPost(formValue as CommentLike).subscribe({
      next:(() => {
        this.resetForm();
        this.commentResource.reload();
      }),
      error:(() => {

      })
    })
  }

  private resetForm(): void {
    this.commentForm.reset(this.initialFormState);
    this.commentForm.markAsPristine();
    this.commentForm.markAsUntouched();
  }
}
