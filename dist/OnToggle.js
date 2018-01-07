(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.OnToggle = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

/**
 * OnToggle.js
 * @author Ozy Wu-Li - @ousikaa
 * @description Toggle DOM element state
 */

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
            // ADD CLICK EVENT TO TOGGLE ELEMENT
            $(this.options.toggleEl).on('click', this.openToggle.bind(this));
            // REMOVE CLICK EVENT ON CHILD ELEMENTS
            $(this.options.toggleEl).children().css('pointer-events', 'none');
            // CLICK ANYWHERE BUT THE TOGGLE ELEMENT AND THE TARGET FROM TO DEACTIVATE
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
            this.eventType = event;
        },
        /**
         * 
         */
        openToggle: function openToggle(event) {
            event.preventDefault();

            // TOGGLE THIS EL'S CLASS
            $(event.target).toggleClass(this.options.isVisibleClass);

            // get the associated toggle target
            var thisToggleTargetEl = $(event.target).attr('data-toggle-target');

            // hide any toggle target that isn't the associated target
            $(this.options.toggleTargetEl).not($('.' + thisToggleTargetEl)).removeClass(this.options.isVisibleClass);
            $('.' + thisToggleTargetEl).toggleClass(this.options.isVisibleClass);
        },

        /**
         * 
         */
        detectOutsideClick: function detectOutsideClick(event) {
            if (!$(event.target).closest(this.options.toggleEl + ', ' + this.options.toggleTargetEl).length) {
                $(this.options.toggleEl + ', ' + this.options.toggleTargetEl).removeClass(this.options.isVisibleClass);
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
    module.exports = OnToggle;
})(jQuery, window, document);

},{}]},{},[1])(1)
});