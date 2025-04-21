import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'blog-page',
  imports: [],
  templateUrl: './blog-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogPageComponent { }
