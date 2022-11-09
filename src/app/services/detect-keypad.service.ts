import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DetectKeypadService {
  isSearchFocused: boolean = false;
  fullWindowHeight = window.innerHeight;

  constructor() {
    this.detectVirtualKeyboard();

   }

  onSearchFocus() {
    this.isSearchFocused = true;
  }

  onSearchBlur() {   
    this.isSearchFocused = false;
  }

  detectVirtualKeyboard() {
    window.addEventListener("resize", () => {
      if(window.innerHeight == this.fullWindowHeight) {
        this.isSearchFocused = false;
      } else if(window.innerHeight < this.fullWindowHeight*0.9) {
        this.isSearchFocused = true;
      }
    });

  }

}
