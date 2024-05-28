import { Component, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "@nativescript/angular";
import { Color, CoreTypes, Image, Label } from "@nativescript/core";

@Component({
  standalone: true,
  imports: [NativeScriptCommonModule],
  schemas: [NO_ERRORS_SCHEMA],
  template: `
    <GridLayout class="w-full h-full gradient-jsdrop rounded-3xl">
      <Label
        class="text-[75px] text-black text-center font-bold"
        (loaded)="loadedLabel($event)"
        >Hello NativeScript on visionOS</Label
      >
      <Image
        src="https://drive.google.com/uc?export=download&id=1zLbAW-xJHHnM4dZY7RBHPS2YmxDYqJlB"
        class="align-bottom h-[200] mb-8"
        (loaded)="loadedImage($event)"
      ></Image>
    </GridLayout>
  `,
})
export class SceneComponent {
  label: Label;
  image: Image;
  colorInterval: NodeJS.Timeout;
  forward = false;

  loadedLabel(args) {
    this.label = args.object;
    this.colorInterval = setInterval(() => {
      console.log("SceneComponent interval fired!");
      this.label.color = new Color(
        "#000000".replace(/0/g, function () {
          return (~~(Math.random() * 16)).toString(16);
        })
      );
      this.forward = !this.forward;
      this.label.animate({
        translate: { x: this.forward ? 100 : -100, y: 0 },
        duration: 1800,
        curve: CoreTypes.AnimationCurve.easeInOut,
      });
      this.image.animate({
        scale: { x: this.forward ? 1.2 : 0.8, y: this.forward ? 1.2 : 0.8 },
        duration: 1800,
        curve: CoreTypes.AnimationCurve.easeInOut,
      });
    }, 2000);
  }

  loadedImage(args) {
    this.image = args.object;
  }

  ngOnDestroy() {
    console.log("SceneComponent destroyed.");
    clearInterval(this.colorInterval);
  }
}
