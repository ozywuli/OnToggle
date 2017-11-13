(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

// https://github.com/jquery-boilerplate/jquery-patterns/blob/master/patterns/jquery.basic.plugin-boilerplate.js

// the semi-colon before the function invocation is a safety
// net against concatenated scripts and/or other plugins
// that are not closed properly.
// the anonymous function protects the `$` alias from name collisions
;(function ($, window, document, undefined) {
    var pluginName = 'OnToggle';

    /**
     * 
     */
    var defaults = {
        toggleEl: '.js-toggle',
        toggleTargetEl: '.js-toggle-target',
        isVisibleClass: 'is-visible'

        /**
         * PLUGIN CONSTRUCTOR 
         */
    };var OnToggle = function OnToggle(options) {
        this.options = $.extend({}, defaults, options);
        this.init();
    };

    /**
     * 
     */
    // https://stackoverflow.com/questions/4736910/javascript-when-to-use-prototypes
    OnToggle.prototype = {

        /**
         * 
         */
        init: function init() {
            this.checkDevice();
            $(this.options.toggleEl).on('click', this.openToggle.bind(this));
            $(document).on(this.eventType, this.detectOutsideClick.bind(this));
        },

        /**
         * 
         */
        eventType: 'click',

        /**
         * 
         */
        checkDevice: function checkDevice() {
            // if we detect an ios device, then use the `touchstart`event instead of the `click` event
            var event = /iPad|iPhone|iPod/.test(navigator.userAgent) ? "touchstart" : "click";
            this.event = event;
        },
        /**
         * 
         */
        openToggle: function openToggle(event) {
            event.preventDefault();
            // get the associated toggle target
            var thistoggleTargetEl = $(event.target).attr('data-toggle-target');

            // hide any toggle target that isn't the associated target
            $(this.options.toggleTargetEl).not($('.' + thistoggleTargetEl)).removeClass(this.options.isVisibleClass);
            $('.' + thistoggleTargetEl).toggleClass(this.options.isVisibleClass);
        },

        /**
         * 
         */
        detectOutsideClick: function detectOutsideClick(event) {
            if (!$(event.target).closest(this.options.toggleEl + ', ' + this.options.toggleTargetEl).length) {
                $('' + this.options.toggleTargetEl).removeClass(this.options.isVisibleClass);
            }
        }

        // A really lightweight plugin wrapper around the constructor,
        // preventing against multiple instantiations
    };$.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new OnToggle(options));
            }
        });
    };

    /*------------------------------------*\
      EXPORT OPTIONS
    \*------------------------------------*/
    // if (typeof define === 'function' && define.amd) {
    //     define([], function() {
    //         return toggle;
    //     });
    // } else if (typeof exports !== "undefined" && exports !== null) {
    //     module.exports = toggle;
    // } else {
    //     window.toggle = toggle;
    // }

    module.exports = OnToggle;
})(jQuery, window, document);

},{}]},{},[1])

//# sourceMappingURL=OnToggle.js.map
