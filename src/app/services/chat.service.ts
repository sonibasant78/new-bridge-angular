import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  isMessageSelected: boolean = false;
  selectedChatIndex: number;
  constructor() { }

  ngOnInit(): void {
  }

  showMessage(index: number) {
    this.selectedChatIndex = index;
    this.isMessageSelected = true;
  }
}
