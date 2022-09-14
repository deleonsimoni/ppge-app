import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'card-profiles',
  templateUrl: './card-profiles.component.html',
  styleUrls: ['./card-profiles.component.scss']
})
export class CardProfilesComponent {

  @Input() profile: any;
  @Output() delete: EventEmitter<any> = new EventEmitter();
  @Output() edit: EventEmitter<boolean> = new EventEmitter();

}
