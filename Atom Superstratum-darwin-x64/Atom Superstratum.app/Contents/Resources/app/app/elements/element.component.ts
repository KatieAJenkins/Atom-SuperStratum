import { Component, Input, Output, EventEmitter, DoCheck  } from '@angular/core';
import { Element } from './element';

@Component({
  moduleId: module.id,
  selector: 'pt-element',
  templateUrl: 'element.component.html',
    styleUrls: ['element.component.css'] 

})

export class ElementComponent implements DoCheck {
  @Input() elementData: Element;
  // ^ exposes elementData property to parent component, listens for parent component to send data to child

  @Output() elementHovered: EventEmitter<Object> = new EventEmitter<Object>();
  // ^ exposes which element is being hovered on to the parent component, sends proper data to hoverReceived fxn

  elementStyle: Object = {};

  // Implement DoCheck instead of OnChanges because OnChanges will not detect
  // change on a property of elementData, it will only detect if elementData
  // itself is changed
  ngDoCheck() {
    if (this.elementData.highlight) {
      // console.log(this.elementData.groupBlock);
      // console.log(this.elementData.standardState);
      
      switch(this.elementData.groupBlock) {
   
        case 'halogen':
          this.elementStyle = {'background-color': '#ffda00'} //orange
          break;

        case 'noble gas':
          this.elementStyle = {'background-color': '#ffff00'} //yellow
          break;

        case 'nonmetal':
          this.elementStyle = {'background-color': '#ffffb0'} //light yellow
          break;

        case 'actinoid':
          this.elementStyle = {'background-color': '#9eff9e'}  //very light green
          break;

        case 'alkali metal':
          this.elementStyle = {'background-color': '#7ce348'} //light green
          break;

        case 'alkaline earth metal':
          this.elementStyle = {'background-color': '#44cc77'} //green
          break;

        case 'lanthanoid':
          this.elementStyle = {'background-color': '#00d060'} //green
          break;

        case 'transition metal':
            this.elementStyle = {'background-color': '#0c914a'} //a bit darker green
          break;
        
        case 'metal':
          this.elementStyle = {'background-color': '#229988'} //dark green/blue
          break;

        case 'metalloid':
          this.elementStyle = {'background-color': '#226688'} //drkblue
          break;

        default:
      }

    } else {
      this.elementStyle = {'background-color': 'transparent'};
    }
  }

  onHover(): void {
    this.elementHovered.emit(this.elementData);
  }
  // ^ sends data into emit channel to be picked up by parent component

}
