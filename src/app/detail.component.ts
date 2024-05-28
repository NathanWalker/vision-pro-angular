import { Component, computed, inject } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "@nativescript/angular";
import { DataService, DataType } from "./data.service";
import { WindowManager, XR } from "@nativescript/swift-ui";

@Component({
  selector: "ns-detail",
  templateUrl: "./detail.component.html",
})
export class DetailComponent {
  router = inject(RouterExtensions);
  activeRoute = inject(ActivatedRoute);
  data = inject(DataService);
  sceneOpen = false;
  customOpen = false;
  models = ["Satellite", "Moon", "Telescope"];
  activeModel: string;
  buttonText = computed(() =>
    this.data.currentDetailId === "globe"
      ? "View Globe"
      : this.data.currentDetailId === "solar"
      ? "View Outer Space"
      : "View Orbits"
  );
  detailImage = computed(() =>
    this.data.currentDetailId === "globe"
      ? "res://GlobeHero"
      : "res://SolarHero"
  );

  constructor() {
    this.activeRoute.paramMap.pipe(takeUntilDestroyed()).subscribe((params) => {
      this.data.currentDetailId = params.get("id") as DataType;
      this.activeModel = this.models[0];
    });
  }

  close() {
    this.router.back();
  }

  openWindow() {
    this.sceneOpen = !this.sceneOpen;
    switch (this.data.currentDetailId) {
      case "globe":
        const win = WindowManager.getWindow("Globe");
        if (this.sceneOpen) {
          win.open();
        } else {
          win.close();
        }
        break;
      case "orbit":
        if (this.sceneOpen) {
          XR.requestSession("Orbit");
        } else {
          XR.endSession();
        }
        break;
      case "solar":
        if (this.sceneOpen) {
          XR.requestSession("Solar");
        } else {
          XR.endSession();
        }
        break;
    }
  }

  openCustomScene() {
    this.customOpen = !this.customOpen;
    const win = WindowManager.getWindow("MyCustomScene");
    if (this.customOpen) {
      win.open();
    } else {
      win.close();
    }
  }

  changeModel(args) {
    this.activeModel = this.models[args.newIndex];
  }
}
