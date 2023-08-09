import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, HostListener, Inject, Renderer2 } from '@angular/core';

@Directive({
  selector: '[noImage]'
})
export class NoImageDirective {

  constructor(
    private element: ElementRef,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) { }

  @HostListener('error')
  onError() {
    const parentElement = this.element.nativeElement.parentElement;
    const child = this.document.createElement('p');
    let nameImage: string = this.element.nativeElement.getAttribute('alt') || '';

    if (!!nameImage && nameImage !== '') {
      nameImage = nameImage.substring(0, 2);
    }

    parentElement.classList.add('empty-logo');
    child.classList.add('empty-logo-name');
    child.innerHTML = nameImage;    

    this.renderer.appendChild(parentElement, child);
    this.element.nativeElement.style.display = 'none';
  }

}
