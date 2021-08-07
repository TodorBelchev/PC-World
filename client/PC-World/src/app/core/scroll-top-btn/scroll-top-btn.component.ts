import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject } from '@angular/core';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-scroll-top-btn',
  templateUrl: './scroll-top-btn.component.html',
  styleUrls: ['./scroll-top-btn.component.scss']
})
export class ScrollTopBtnComponent {
  faChevronUp = faChevronUp;
  windowScrolled: boolean = false;
  constructor(@Inject(DOCUMENT) private document: Document) { }
  @HostListener("window:scroll", [])
  onWindowScroll() {
    if (this.document.scrollingElement?.scrollTop! > 50) {
      this.windowScrolled = true;
    }
    else if (this.document.scrollingElement?.scrollTop! < 50) {
      this.windowScrolled = false;
    }
  }
  scrollToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    this.windowScrolled = false;
  }

}
