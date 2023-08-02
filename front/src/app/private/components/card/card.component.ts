import { Component, Input } from '@angular/core';
import { TodoI } from '../../private-module.iterfaces';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() item: TodoI | undefined;
}
