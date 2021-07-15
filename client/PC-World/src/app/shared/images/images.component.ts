import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss']
})
export class ImagesComponent implements OnInit {
  @Input() images: string[] = [];
  imageIndex: number = 0;
  constructor() { }

  ngOnInit(): void {
  }

  onImgClick(index: number): void {
    this.imageIndex = index;
  }
}
