import { ChangeDetectionStrategy, Component, OnInit, OnDestroy, signal } from '@angular/core';

@Component({
  selector: 'carousel-home',
  standalone: true,
  templateUrl: './carousel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarouselComponent implements OnInit, OnDestroy {
  public images = signal([
    'assets/images-carousel/carousel-afiliacion.jpg',
    'assets/images-carousel/carousel-noticias.jpg',
    'assets/images-carousel/carousel-PQRSDF.jpg',
    'assets/images-carousel/carousel-turismo.jpg',
  ]);

  public currentIndex = signal(0);
  private intervalId: any;

  ngOnInit() {
    this.startAutoRotation();
  }

  ngOnDestroy() {
    this.stopAutoRotation();
  }

  startAutoRotation() {
    this.intervalId = setInterval(() => {
      this.nextImage();
    }, 2000);
  }

  stopAutoRotation() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  nextImage() {
    this.currentIndex.set((this.currentIndex() + 1) % this.images().length);
  }

  prevImage() {
    this.currentIndex.set(
      (this.currentIndex() - 1 + this.images().length) % this.images().length
    );
  }
}
