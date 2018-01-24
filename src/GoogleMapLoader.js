
/**
 * class GoogleMapLoader
 * @link https://github.com/Carrooi/Js-GoogleMapsLoader (js render to es6 package)
 */
export class GoogleMapLoader {

  constructor(options) {

    this.googleVersion = '3.31.6';

    this.script = null;

    this.google = null;

    this.loading = false;

    this.callbacks = [];

    this.onLoadEvents = [];

    this.originalCreateLoaderMethod = null;

    this.GoogleMapsLoader = {};

    this.GoogleMapsLoader.URL = 'https://maps.googleapis.com/maps/api/js';

    this.GoogleMapsLoader.KEY = null;

    this.GoogleMapsLoader.LIBRARIES = [];

    this.GoogleMapsLoader.CLIENT = null;

    this.GoogleMapsLoader.CHANNEL = null;

    this.GoogleMapsLoader.LANGUAGE = null;

    this.GoogleMapsLoader.REGION = null;

    this.GoogleMapsLoader.VERSION = this.googleVersion;

    this.GoogleMapsLoader.WINDOW_CALLBACK_NAME = '__google_maps_api_provider_initializator__';

    this.GoogleMapsLoader._googleMockApiObject = {};

    Object.assign(this.GoogleMapsLoader, options);
    // console.log(this.GoogleMapsLoader);
  }

  load(fn) {
    let then = this;
    if (this.google === null) {
      if (this.loading === true) {
        if (fn) {
          this.callbacks.push(fn);
        }
      } else {
        this.loading = true;

        window[this.GoogleMapsLoader.WINDOW_CALLBACK_NAME] = () => {
          then.ready(fn);
        };

        this.createLoader();
      }
    } else if (fn) {
      fn(this.google);
    }
  }

  /**
   * 建立 loader 並載入 API script
   */
  createLoader() {
    this.script = document.createElement('script');
    this.script.type = 'text/javascript';
    this.script.src = this.createUrl();

    document.body.appendChild(this.script);
  }

  /**
   * 判斷載入
   */
  isLoaded() {
    return this.google !== null;
  }

  /**
   * 建立 API 參數
   */
  createUrl() {
    var url = this.GoogleMapsLoader.URL;

    url += '?callback=' + this.GoogleMapsLoader.WINDOW_CALLBACK_NAME;

    if (this.GoogleMapsLoader.KEY) {
      url += '&key=' + this.GoogleMapsLoader.KEY;
    }

    if (this.GoogleMapsLoader.LIBRARIES.length > 0) {
      url += '&libraries=' + this.GoogleMapsLoader.LIBRARIES.join(',');
    }

    if (this.GoogleMapsLoader.CLIENT) {
      url += '&client=' + this.GoogleMapsLoader.CLIENT + '&v=' + this.GoogleMapsLoader.VERSION;
    }

    if (this.GoogleMapsLoader.CHANNEL) {
      url += '&channel=' + this.GoogleMapsLoader.CHANNEL;
    }

    if (this.GoogleMapsLoader.LANGUAGE) {
      url += '&language=' + this.GoogleMapsLoader.LANGUAGE;
    }

    if (this.GoogleMapsLoader.REGION) {
      url += '&region=' + this.GoogleMapsLoader.REGION;
    }

    return url;
  }


  release(fn) {
    let then = this;
    let release = () => {
      then.GoogleMapsLoader.KEY = null;
      then.GoogleMapsLoader.LIBRARIES = [];
      then.GoogleMapsLoader.CLIENT = null;
      then.GoogleMapsLoader.CHANNEL = null;
      then.GoogleMapsLoader.LANGUAGE = null;
      then.GoogleMapsLoader.REGION = null;
      then.GoogleMapsLoader.VERSION = then.googleVersion;

      then.google = null;
      then.loading = false;
      then.callbacks = [];
      then.onLoadEvents = [];

      if (typeof window.google !== 'undefined') {
        delete window.google;
      }

      if (typeof window[then.GoogleMapsLoader.WINDOW_CALLBACK_NAME] !== 'undefined') {
        delete window[then.GoogleMapsLoader.WINDOW_CALLBACK_NAME];
      }

      if (then.originalCreateLoaderMethod !== null) {
        then.createLoader = then.originalCreateLoaderMethod;
        then.originalCreateLoaderMethod = null;
      }

      if (then.script !== null) {
        then.script.parentElement.removeChild(then.script);
        then.script = null;
      }

      if (fn) {
        fn();
      }
    };

    if (then.loading) {
      then.load(() => {
        then.release();
      });
    } else {
      then.release();
    }
  }

  onLoad(fn) {
    this.onLoadEvents.push(fn);
  }

  makeMock() {
    let then = this;
    this.originalCreateLoaderMethod = this.createLoader;

    this.createLoader = () => {
      window.google = this.GoogleMapsLoader._googleMockApiObject;
      window[then.GoogleMapsLoader.WINDOW_CALLBACK_NAME]();
    };
  }

  ready(fn) {
    var i;

    this.loading = false;

    if (this.google === null) {
      this.google = window.google;
    }

    for (i = 0; i < this.onLoadEvents.length; i++) {
      this.onLoadEvents[i](this.google);
    }

    if (fn) {
      fn(this.google);
    }

    for (i = 0; i < this.callbacks.length; i++) {
      this.callbacks[i](this.google);
    }

    this.callbacks = [];
  }

}