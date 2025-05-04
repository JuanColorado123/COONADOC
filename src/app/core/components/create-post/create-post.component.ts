import { Component, signal } from '@angular/core';
import { CreatePostDetailsComponent } from "./create-post-details/create-post-details.component";
import { ToastComponent } from '@shared/components/toast/toast.component';

@Component({
  selector: 'core-create-post',
  imports: [CreatePostDetailsComponent, ToastComponent],
  templateUrl: './create-post.component.html'
})
export class CreatePostComponent {
  showToast = signal(false);
  toastMessage = signal('');
  toastType = signal<'success' | 'error'>('success');

  handlePostCreation(result: {success: boolean, message: string}) {
    this.showToast.set(true);
    this.toastMessage.set(result.message);
    this.toastType.set(result.success ? 'success' : 'error');

    setTimeout(() => {
      this.showToast.set(false);
      if (result.success) {
        (document.getElementById('my_modal_4') as HTMLDialogElement)?.close();
      }
    }, 1200);
  }
}
