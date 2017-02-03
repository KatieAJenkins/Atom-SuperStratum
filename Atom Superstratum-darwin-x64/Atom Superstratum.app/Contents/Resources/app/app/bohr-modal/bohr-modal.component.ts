import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { ElementService } from '../elements/elements.service';

@Component({
  moduleId: module.id,
  selector: 'bohr-modal',
  templateUrl: 'bohr-modal.component.html',
  styleUrls: ['bohr-modal.component.css'] 
})

export class BohrModalComponent {
    
    @Input() showBohrModal: boolean;

    @Output() notify: EventEmitter<boolean> = new EventEmitter<boolean>();

    closeClick() {
      this.showBohrModal = !this.showBohrModal;
      this.notify.emit(this.showBohrModal);
    }
}