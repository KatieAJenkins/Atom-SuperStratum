import { Component, Input, OnInit, OnChanges } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'pt-button',
  templateUrl: 'filter-button.component.html',
    styleUrls: ['filter-button.component.css'] 
})

export class FilterButtonComponent implements OnInit, OnChanges {
  @Input() name: string;
  @Input() filterGroupBlocks: string[];
  @Input() filterState: string;
  
  buttonName: string;
  buttonHighlighted: boolean;
  isMainGroup: boolean = false;;

  ngOnInit(): void {
    this.buttonName = this.returnButtonName(this.name);
    if (this.buttonName === 'nonmetals' || this.buttonName === 'metals' || this.buttonName === 'metalloids') {
      this.isMainGroup = true;
    }
  }

  // Needs huge refactoring
  // This was just the fastest way to solve the problem...
  ngOnChanges(): void {
    if (this.filterGroupBlocks.length === 1) {
      const filterGroup = this.filterGroupBlocks[0];
      if (filterGroup === this.name) {
        this.buttonHighlighted = true;
      } else {
        this.buttonHighlighted = false;
      }
    } else if (this.filterGroupBlocks.length > 1) {
      const isNonMetal = this.filterGroupBlocks
        .some(groupBlock => groupBlock === 'noble gas');
      if (isNonMetal && this.name === 'allNonMetal') {
        this.buttonHighlighted = true;
      } else if (!isNonMetal && this.name === 'allMetal') {
        this.buttonHighlighted = true;
      } else {
        this.buttonHighlighted = false;
      }
    }
    else {
      this.buttonHighlighted = false;
    }

    if (this.name === 'solid' || this.name === 'liquid' || this.name === 'gas' || this.name === '') {
      if (this.filterState === this.name) {
        this.buttonHighlighted = true;
      } else {
        this.buttonHighlighted = false;
      }
    }
  }

  returnButtonName(groupName: string): string {
    switch(groupName) {
      case 'noble gas':
        return 'noble gases';
      case 'allNonMetal':
        return 'nonmetals'
      case 'allMetal':
        return 'metals';
      // fallthrough
      case 'solid':
      case 'liquid':
      case 'gas':
        return groupName;
      // fallthrough
      case 'nonmetal':
      case 'metal':
      case '':
        return 'other';
      default:
        return groupName + 's';
    }
  }
  
}