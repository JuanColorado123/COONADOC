import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'shared-footer',
  imports: [],
  templateUrl: './footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  public emails = signal<string[]>([
    'gerencia@coonadoc.co',
    'servicioalclientecoonadoc@gmail.com'
  ])
}
