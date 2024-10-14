import { Component, Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: 'app-e2',
  standalone: true,
  imports: [],
  templateUrl: './e2.component.html',
  styleUrls: ['./e2.component.css'] 
})
export class E2Component {
  email: string = 'R100@resturant.com';

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  playVideo() {
    const imgaaElement = this.el.nativeElement.querySelector('.imgaa');
    const videoIframe = this.renderer.createElement('iframe');

    this.renderer.setAttribute(videoIframe, 'width', '100%');
    this.renderer.setAttribute(videoIframe, 'height', '690');
    this.renderer.setAttribute(videoIframe, 'src', 'https://www.youtube.com/embed/FEo2yAuK0gk?si=CaDqAQsT6NMaKYlF&autoplay=1');
    this.renderer.setAttribute(videoIframe, 'title', 'YouTube video player');
    this.renderer.setAttribute(videoIframe, 'frameborder', '0');
    this.renderer.setAttribute(videoIframe, 'allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
    this.renderer.setAttribute(videoIframe, 'allowfullscreen', '');
    this.renderer.setProperty(imgaaElement, 'innerHTML', '');
    this.renderer.appendChild(imgaaElement, videoIframe); 
  }
}
