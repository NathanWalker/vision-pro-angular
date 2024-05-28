import { Component } from "@angular/core";
import { registerElement } from "@nativescript/angular";
import { Model3D } from '@nativescript/swift-ui';

registerElement('Model3D', () => Model3D);

@Component({
  selector: "ns-app",
  templateUrl: "./app.component.html",
})
export class AppComponent {}
