import { Component, Input, Output, EventEmitter } from '@angular/core'
import { Hero } from '../hero'

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls:  ['./hero.component.css']
})
export class HeroComponent {
  @Input() hero: Hero
  @Output() delete = new EventEmitter()
  @Output() delete2 = new EventEmitter()

  onDeleteClick($event): void {
    // $event.stopPropagation()
    // this.delete.next()
    this.delete.emit(this.hero)
  }

  onDelete2Click($event): void {
    $event.stopPropagation()
    this.delete2.next()
  }
}
