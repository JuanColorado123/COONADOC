import { ChangeDetectionStrategy, Component, inject, output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';
import { BlogService } from '@pages/blog/blog.service';

@Component({
  selector: 'create-post-details',
  imports: [ReactiveFormsModule],
  templateUrl: './create-post-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreatePostDetailsComponent {

  public postCreated = output<{success: boolean, message: string}>();

  private blogService = inject(BlogService);
  private fb = inject(FormBuilder);

  private initialFormState = {
    name: '',
    content: '',
    postedBy: '',
    tags: [] as string[]
  };

  public tags = signal<string[]>([]);
  public showSuccess = signal(false);

  public postForm = this.fb.group({
    name: new FormControl<string>('', Validators.required),
    content: new FormControl<string>('', [Validators.required, Validators.maxLength(5000)]),
    postedBy: new FormControl<string>('', Validators.required),
    tags: new FormControl<string[]>([], [Validators.required, Validators.minLength(1)])
  });

  public addTag(event: any): void {
    const input = event.target as HTMLInputElement;
    const value = input.value.trim();

    if (value && !this.tags().includes(value)) {
      this.tags.update(prev => [...prev, value]);
      this.postForm.controls.tags.setValue(this.tags());
      this.postForm.controls.tags.markAsTouched();
      input.value = '';
    }
  }

  public removeTag(tag: string): void {
    this.tags.update(prev => prev.filter(t => t !== tag));
    this.postForm.controls.tags.setValue(this.tags());
    if (this.tags().length === 0) {
      this.postForm.controls.tags.setErrors({ required: true });
    }
  }
  public onSubmit(): void {
    this.postForm.markAllAsTouched();

    if (this.postForm.invalid) {
      return;
    }

    const formValue = {
      name: this.postForm.value.name ?? '',
      content: this.postForm.value.content ?? '',
      postedBy: this.postForm.value.postedBy ?? '',
      tags: this.tags()
    };

    const postData = {
      name: formValue.name,
      content: formValue.content,
      postedBy: formValue.postedBy,
      tags: formValue.tags.map(tag => ({ name: tag }))
    };

    this.blogService.createNewPost(postData).subscribe({
      next: () => {
        this.resetForm();
        this.postCreated.emit({success: true, message: '¡Post creado exitosamente!'});
      },
      error: (err) => {
        this.postCreated.emit({success: false, message: 'Error al crear el post'});
      }
    });
  }

  private resetForm(): void {
    this.postForm.reset(this.initialFormState);
    this.tags.set([]);
    this.postForm.markAsPristine();
    this.postForm.markAsUntouched();
  }
}

