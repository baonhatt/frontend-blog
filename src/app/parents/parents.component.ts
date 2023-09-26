import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-parents',
  templateUrl: './parents.component.html',
  styleUrls: ['./parents.component.scss']
})
export class ParentsComponent {
  receivedName!: string;

  receiveName(name: string) {
    this.receivedName = name;

    console.log(this.receivedName);

  }
}
