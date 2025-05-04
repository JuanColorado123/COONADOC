import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

@Component({
  selector: 'shared-toast',
  imports: [],
  templateUrl: './toast.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastComponent {
  visible = input.required<boolean>();
  message = input.required<string>();
  type = input<'success' | 'error'>('success');
}
