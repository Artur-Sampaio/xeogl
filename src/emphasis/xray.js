/**
 A **XRay** renders attached an X-ray view of attached {{#crossLink "Entity"}}Entities{{/crossLink}}.

 ## Overview

 TODO

 ## Usage

 ````javascript

 var xray = new xeogl.XRay({
    thickness: 15,      // Default
    color: [1,0,0]      // Default
 });

 new xeogl.Entity({
     geometry: new xeogl.TorusGeometry(),
     xray: xray,
     xrayed: false
 });

 new xeogl.Entity({
     geometry: new xeogl.BoxGeometry(),
     xray: xray,
     xrayed: true
 });
 ````

 @class XRay
 @module xeogl
 @submodule emphasis
 @constructor
 @param [scene] {Scene} Parent {{#crossLink "Scene"}}Scene{{/crossLink}}, creates this XRay within the
 default {{#crossLink "Scene"}}Scene{{/crossLink}} when omitted.
 @param [cfg] {*} XRay configuration
 @param [cfg.id] {String} Optional ID, unique among all components in the parent {{#crossLink "Scene"}}Scene{{/crossLink}}, generated automatically when omitted.
 @param [cfg.meta] {String:Object} Optional map of user-defined metadata to attach to this XRay.
 @param [cfg.thickness=15] {Number} Thickness of the XRay in pixels.
 @param [cfg.color=[1,1,0]] {Float32Array} The RGB XRay color.
 @extends Component
 */
(function () {

    "use strict";

    xeogl.XRay = xeogl.Component.extend({

        type: "xeogl.XRay",

        _init: function (cfg) {

            this._state = new xeogl.renderer.XRay({
                thickness: 15,
                color: xeogl.math.vec3([1.0, 1.0, 0.0])
            });

            this.thickness = cfg.thickness;
            this.color = cfg.color;
        },

        _props: {

            /**
             * The XRay's thickness in pixels.
             *
             * @property thickness
             * @default 15
             * @type Number
             */
            thickness: {

                set: function (value) {

                    // TODO: Only accept rendering thickness in range [0...MAX_thickness]

                    value = value || 15;

                    value = Math.round(value);


                    if (value === this._state.thickness) {
                        return;
                    }

                    this._state.thickness = value;

                    this._renderer.imageDirty = true;
                },

                get: function () {
                    return this._state.thickness;
                }
            },

            /**
             The XRay's RGB color.

              @property color
             @default [1.0, 1.0, 0.0]
             @type Float32Array
             */
            color: {

                set: function (value) {

                    var color = this._state.color;

                    if (!color) {
                        color = this._state.color = new Float32Array(3);

                    } else if (value && color[0] === value[0] && color[1] === value[1] && color[2] === value[2]) {
                        return;
                    }

                    if (value) {
                        color[0] = value[0];
                        color[1] = value[1];
                        color[2] = value[2];

                    } else {
                        color[0] = 1;
                        color[1] = 1;
                        color[2] = 0;
                    }

                    this._renderer.imageDirty = true;
                },

                get: function () {
                    return this._state.color;
                }
            }
        },

        _compile: function () {
            this._renderer.xray = this._state;
        },

        _getJSON: function () {
            return {
                thickness: this._state.thickness,
                color: xeogl.math.vecToArray(this._state.color)
            };
        },

        _destroy: function () {
            this._state.destroy();
        }
    });

})();
