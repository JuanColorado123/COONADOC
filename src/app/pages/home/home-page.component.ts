import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CarouselComponent } from './carousel/carousel.component';
import { AboutPageComponent } from '@pages/about/about-page.component';



@Component({
  selector: 'home-page',
  imports: [CarouselComponent, AboutPageComponent],
  templateUrl: './home-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HomePageComponent { }
