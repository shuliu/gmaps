
import { GoogleMapLoader } from './GoogleMapLoader';

/**
 * google maps class
 * @class GMaps
 */
export class GMaps {

  constructor(options) {

    /** @var { string } Key google map client key */
    this._Key;

    /** @var { HTMLElement } Elem map view element */
    this._Elem;

    /** @var { object } infoWindow marker infoWindow */
    this._infoWindow;

    /** @var { GoogleMapLoader } GMap GoogleMapLoader */
    this._GoogleMapLoader;

    /** @var { Object } google maps Map */
    this.Map;

    /** @var { array } marker Markers */
    this.markers = [];

    /** @var { Object } defaultInitialOptions google maps initial default option */
    this._defaultInitialOptions = {
      KEY: '',
      LANGUAGE: 'zh-tw',
      REGION: 'TW'
    };
    /** @var { Object } _defaultMapsOptions google maps first view option */
    this._defaultMapsOptions = {
      // Taiwan Taipei
      center: { lat: 25.0489147, lng: 121.5144431 },
      zoom: 14
    };

    if (typeof options === 'object') {
      this.setOptions(options);
    }
  }

  /**
   * 綁定 Marker 事件
   * @param {string} eventType google event type
   * @param {object} marker Marker
   * @param {*} fn callback function
   */
  setMarkerEvent(eventType, marker, fn) {
    google.maps.event.addListener(marker, eventType, fn);

    return this;
  }

  /**
   * 監聽 DOM 元件事件
   * @param {string} eventType google event type
   * @param {DOMElement} DOM html element
   * @param {function} fn callback function
   */
  setDOMEvent(eventType, DOM, fn) {
    google.maps.event.addDomListener(DOM, eventType, fn);

    return this;
  }

  /**
   * 監聽元件事件
   * @param {string} eventType google event type
   * @param {element} elem 綁定過 google object 的原件
   * @param {function} fn callback function
   */
  setElemEvent(eventType, elem, fn) {
    elem.addListener(eventType, fn);

    return this;
  }

  /**
   * 監聽整體事件
   * @param {string} eventType google event type
   * @param {function} fn callback function
   */
  setGoogleEvent(eventType, fn) {
    google.maps.event.addListener(eventType, fn);

    return this;
  }

  /**
   * 綁定 google address search input
   * @param {input} inputElem
   */
  setSearchBox(inputElem) {
    let then = this;
    this._GoogleMapLoader.load((google) => {
      let searchBox = new google.maps.places.SearchBox(inputElem);
      // this.Map.controls[google.maps.ControlPosition.TOP_LEFT].push(inputElem);

      // Bias the SearchBox results towards current map's viewport.
      // then.setGoogleEvent('bounds_changed', () => {
      //   searchBox.setBounds(google.getBounds());
      // });
      // then.Map.addListener('bounds_changed',
    });


    return this;
  }

  /**
   * set map lat, lng
   * @param {number} lat Lat
   * @param {number} lng Lng
   */
  setLatLng(lat, lng) {
    if (typeof lat !== 'number' || typeof lng !== 'number') {
      console.warn('[GoogleMaps] please set lat, lng');
      return this;
    }

    let then = this;
    this._GoogleMapLoader.load((google) => {
      then.Map.setCenter(new google.maps.LatLng(lat, lng));
    });
    console.log('[GoogleMaps] set LatLng: ' + lat + ' , ' + lng);
    return this;
  }

  /**
   * google map panTo method
   * @param {number} lat Lat
   * @param {number} lng Lng
   */
  panTo(lat, lng) {
    if (typeof lat !== 'number' || typeof lng !== 'number') {
      console.warn('[GoogleMaps] please set lat, lng');
      return this;
    }

    let then = this;
    this._GoogleMapLoader.load((google) => {
      then.Map.panTo(new google.maps.LatLng(lat, lng));
    });
    console.log('[GoogleMaps] panTo: ' + lat + ' , ' + lng);
    return this;
  }

  /**
   * set map zoom
   * @param {number} zoom Zoom
   */
  setZoom(zoom) {
    if (typeof zoom !== 'number') {
      console.warn('[GoogleMaps] please set zoom');
      return this;
    }
    let then = this;
    this._GoogleMapLoader.load((google) => {
      then.Map.setZoom(zoom);
    });
    console.log('[GoogleMaps] set Zoom:' + zoom);
    return this;
  }

  /**
   * set marker
   * @param {object} marker Marker
   * @param {function} fn callback function
   */
  setMarker(marker, fn) {
    let then = this;
    this._GoogleMapLoader.load((google) => {
      marker.map = then.Map;
      let myMarker = new google.maps.Marker(marker);

      if (typeof marker.infoWindow !== 'undefined') {
        then._infoWindow = new google.maps.InfoWindow(myMarker.infoWindow);
        then.setMarkerEvent('click', myMarker, () => {
          if (then._infoWindow !== undefined) {
            then._infoWindow.close();
          }
          then._infoWindow.open(google, myMarker);
        });
      }

      this.markers.push(myMarker);

      /** callback */
      if (typeof fn === 'function') {
        fn(marker);
      }
      return this;
    });

    console.log('[GoogleMaps] set Marker');
    return this;
  }

  /**
   * 隱藏所有 marker
   */
  hideMarkers() {
    this._setMapOnAll(null);
    return this;
  }

  /**
   * 顯示所有 marker
   */
  showMarkers() {
    this._setMapOnAll(this.Map);
    return this;
  }

  /**
   * 移除所有 marker
   */
  removeMarkers() {
    this._setMapOnAll();
    this.markers = [];
    return this;
  }

  /**
   * google map initial
   * @param {function} fn callback
   */
  initial(fn) {

    let then = this;
    this._GoogleMapLoader = new GoogleMapLoader(this._defaultInitialOptions);
    this._GoogleMapLoader.load(function (google) {
      console.log('[GoogleMaps] load google');
      then.Map = new google.maps.Map(then._Elem, then._defaultMapsOptions);

      /** callback */
      if (typeof fn === 'function') {
        fn(then.Map);
      }
      return this;
    });

    console.log('[GoogleMaps] call initial');
    return this;
  }

  /**
   * set option with initial & render maps
   * @param {object} options
   */
  setOptions(options) {
    /** set DOM element */
    if (options.element && this._isElement(options.element) === true) {
      this._Elem = options.element;
    }

    /** set maps initial option */
    if (options.initial.key && typeof options.initial.key === 'string') {
      this._defaultInitialOptions.KEY = options.initial.key;
      this._Key = options.initial.key;
    }
    if (options.initial.language && typeof options.initial.language === 'string') {
      this._defaultInitialOptions.LANGUAGE = options.initial.language;
    }
    if (options.initial.region && typeof options.initial.region === 'string') {
      this._defaultInitialOptions.REGION = options.initial.region;
    }

    if (options.initial.libraries && typeof options.initial.libraries === 'object' && options.initial.libraries.length > 0) {
      this._defaultInitialOptions.LIBRARIES = options.initial.libraries;
    }

    /** set maps map option */
    if (options.maps && Object.keys(options.maps).length > 0) {
      this._defaultMapsOptions = options.maps;
    }

    console.log('[GoogleMaps] call setOptions');
    return this;
  }

  /**
   * check element is HTML element type
   * @private private method
   * @param {element} element Element
   * @return {bool}
   */
  _isElement(element) {
    return element instanceof Element;
  }

  /**
   * 設定地圖上的 Markers
   * 若 map 為 null 時， marker 全部隱藏
   * 若 map 為 map 時， marker 全部設置到該 map 上
   * 若 map 為 undefined 時， marker 全部移除
   * @private private method
   * @param {Map|null} map google.maps.Map
   */
  _setMapOnAll(map) {
    for (var i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(map);
    }
  }

}