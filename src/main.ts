import { platformNativeScript, runNativeScriptAngularApp } from '@nativescript/angular';
import { TouchManager } from '@nativescript/core';
import { AppModule } from './app/app.module';

TouchManager.enableGlobalHoverWhereTap = true;
TouchManager.visionHoverOptions = {
  default: {
    effect: 'highlight',
    shape: 'rect',
    shapeCornerRadius: 16,
  },
};

runNativeScriptAngularApp({
  embedded: true,
  appModuleBootstrap: () => platformNativeScript().bootstrapModule(AppModule),
});

