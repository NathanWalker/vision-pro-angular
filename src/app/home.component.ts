import { Component, inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "@nativescript/angular";
import { DataService } from "./data.service";

@Component({
  selector: "ns-home",
  templateUrl: "./home.component.html",
})
export class HomeComponent {
  router = inject(RouterExtensions);
  activeRoute = inject(ActivatedRoute);
  data = inject(DataService);

  openDetail(args) {
    this.router.navigate(["../detail", args.object.id], {
      relativeTo: this.activeRoute,
    });
  }
}
