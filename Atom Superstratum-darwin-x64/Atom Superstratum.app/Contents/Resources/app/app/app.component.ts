import { Component } from '@angular/core';
import { ElementService } from './elements/elements.service';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.component.html',
  providers: [ ElementService ]
})
export class AppComponent {
  name = 'Angular'; 
}
