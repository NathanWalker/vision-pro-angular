import { NativeScriptConfig } from '@nativescript/core';

export default {
  id: 'org.nativescript.visionproangular',
  appPath: 'src',
  appResourcesPath: 'App_Resources',
  android: {
    v8Flags: '--expose_gc',
    markingMode: 'none'
  },
  visionos: {
    discardUncaughtJsExceptions: false,
    SPMPackages: [
      {
        name: 'WorldAssets',
        libs: ['WorldAssets'],
        path: './Packages/WorldAssets' 
      },
    ]
  }
} as NativeScriptConfig;