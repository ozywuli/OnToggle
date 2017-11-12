(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

// the semi-colon before the function invocation is a safety
// net against concatenated scripts and/or other plugins
// that are not closed properly.
// the anonymous function protects the `$` alias from name collisions
;(function ($, window, document, undefined) {
    /**
     * 
     */
    var defaults = {
        togglerEl: '.js-toggler',
        togglerTargetEl: '.js-toggler-target',
        isVisibleClass: 'is-visible'

        /**
         * PLUGIN CONSTRUCTOR 
         */
    };var Toggler = function Toggler(options) {
        this.options = $.extend({}, defaults, options);
        this.init();
    };

    /**
     * 
     */
    Toggler.prototype = {

        /**
         * 
         */
        init: function init() {
            this.checkDevice();
            $(this.options.togglerEl).on('click', this.openToggle.bind(this));
            $(document).on(this.eventType, this.detectOutsideClick.bind(this));
        },

        self: function self() {
            return this;
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
            var thisTogglerTargetEl = $(event.target).attr('data-toggler-target');

            // hide any toggle target that isn't the associated target
            $(this.options.togglerTargetEl).not($('.' + thisTogglerTargetEl)).removeClass('is-revealed');
            $('.' + thisTogglerTargetEl).toggleClass(this.options.isVisibleClass);
        },

        /**
         * 
         */
        detectOutsideClick: function detectOutsideClick(event) {
            if (!$(event.target).closest(this.options.togglerEl + ', ' + this.options.togglerTargetEl).length) {
                $('' + this.options.togglerTargetEl).removeClass(this.options.isVisibleClass);
            }
        }

        /*------------------------------------*\
          EXPORT OPTIONS
        \*------------------------------------*/
        // if (typeof define === 'function' && define.amd) {
        //     define([], function() {
        //         return Toggler;
        //     });
        // } else if (typeof exports !== "undefined" && exports !== null) {
        //     module.exports = Toggler;
        // } else {
        //     window.Toggler = Toggler;
        // }
    };window.Toggler = Toggler;
})(jQuery, window, document);

},{}]},{},[1])

//# sourceMappingURL=toggler.js.map
