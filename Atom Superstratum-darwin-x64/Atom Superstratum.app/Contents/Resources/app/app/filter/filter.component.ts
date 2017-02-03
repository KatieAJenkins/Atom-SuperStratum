import { Component, OnInit } from '@angular/core';
import { ElementService } from '../elements/elements.service';
import { Element } from '../elements/element';
import { Filter } from './filter';

@Component({
  moduleId: module.id,
  selector: 'pt-filter',
  templateUrl: 'filter.component.html',
    styleUrls: ['filter.component.css'] 
})
export class FilterComponent implements OnInit {
  elements: Element[];
  filter: Filter;
  nonMetalNames: string[] = [
    'allNonMetal',
    'noble gas',
    'halogen',
    'nonmetal'
  ];
  metalNames: string[] = [
    'allMetal',
    'actinoid', 
    'alkaline earth metal', 
    'alkali metal', 
    'lanthanoid', 
    'transition metal',
    'metal'
  ];
  metalloid: string = 'metalloid';
  stateNames: string[] = [
    'solid',
    'liquid',
    'gas',
    ''
  ];

  constructor(private _elementService: ElementService) {
  }

  // Initializes filter with no filter parameters
  ngOnInit() {
    this.elements = this._elementService.elements;
    this.filter = {
      groupBlock: [],
      standardState: 'any'
    };
  }

  // Highlights all table elements matching filter criteria
  highlightElements(): void {
    for (let i = 0; i < this.elements.length; i++) {
      const element = this.elements[i];
      const filterHasParameters = this.filterHasParameters();
      const elementInGroupBlock = this.elementIsInGroupBlock(element);
      const elementInState = this.elementIsInStandardState(element);
      
      if (filterHasParameters && elementInGroupBlock && elementInState) {
        this._elementService.highlightElement(i);
      } else if (!filterHasParameters) {
        this._elementService.highlightElement(i);
      } else {
        this._elementService.unhighlightElement(i);
      }
    }
  }

  // Returns true if there are parameters to filter by
  filterHasParameters(): boolean {
    return this.filter.groupBlock.length !== 0 || 
      this.filter.standardState !== 'any';
  }

  // Returns true if the given element's group is included in the groupBlock
  // filter parameter array
  elementIsInGroupBlock(element: Element) {
    if (this.filter.groupBlock.length === 0) {
      return true;
    } else {
      return this.filter.groupBlock
        .some(groupBlock => groupBlock === element.groupBlock);
    }
  }

  // Returns true if the given element's standard state is the same as the
  // standardState filter parameter
  elementIsInStandardState(element: Element) {
    if (this.filter.standardState === 'any') {
      return true;
    } else {
      return this.filter.standardState === element.standardState;
    }
  }

  // Adds a new groupBlock to the group block filter parameters
  // If the groupBlock passed in is 'nonmetal', then all non-metals are added
  // If the groupBlock passed in is 'metal', then all metals are added
  // Definitely needs to be refactored, but I'm rushed
  addGroupBlock(groupBlock: string): void {
    if (groupBlock === 'allNonMetal' || groupBlock === 'allMetal') {
      if (this.allElementsAlreadySelected(groupBlock)) {
        this.filter.groupBlock = [];
      } else {
        this.filter.groupBlock = this.returnAllElements(groupBlock);
      }
    } else if (!this.groupBlockAlreadySelected(groupBlock)) {
      this.filter.groupBlock = [groupBlock];
    } else {
      this.filter.groupBlock = [];
    }
    this.highlightElements();
  }

  // Returns true if the groupBlock is already a filter parameter
  groupBlockAlreadySelected(groupBlock: string): boolean {
    if (this.filter.groupBlock.length === 0) {
      return false;
    } else {
      return this.filter.groupBlock
        .every(filterGroupBlock => filterGroupBlock === groupBlock)   
    }
  }

  // Returns true if all of the elements of the specified type are already
  // selected
  allElementsAlreadySelected(elementType: string): boolean {
    const elements = elementType === 'allNonMetal' ?
      this.returnAllElements('allNonMetal') :
      this.returnAllElements('allMetal');
    if (this.filter.groupBlock.length === 0) {
      return false;
    } else {
      return elements.every(element => {
        return this.filter.groupBlock
          .some(groupBlock => groupBlock === element);
      });
    }
  }

  // Returns an array of all of the elements of the specified type
  returnAllElements(elementType: string): string[] {
    return elementType === 'allNonMetal' ?
      this.nonMetalNames : this.metalNames;
  }

  // Sets the standardState filter parameter to the string passed in
  addStandardState(standardState: string): void {
    if (standardState === this.filter.standardState) {
      this.filter.standardState = 'any';
    } else {
      this.filter.standardState = standardState;
    }
    this.highlightElements();
  }

  // Clears all filter parameters
  clearFilter(): void {
    this.filter.groupBlock = [];
    this.filter.standardState = 'any';
    this.highlightElements();
  }
}
