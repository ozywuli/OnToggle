(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

// the semi-colon before the function invocation is a safety
// net against concatenated scripts and/or other plugins
// that are not closed properly.
// the anonymous function protects the `$` alias
// ;(function( $, window, document, undefined ) {
//     // if we detect an ios device, then use the `touchstart`event instead of the `click` event
//     let event = (/iPad|iPhone|iPod/.test(navigator.userAgent)) ? "touchstart" : "click";

//     let defaults = {

//     }

//     // PLUGIN CONSTRUCTOR
//     function Toggler( element, options ) {
//         this.element = element;

//         this.options = $.extend( {}, defaults, options );

//         this._defaults = defaults;

//         this._name = Toggler;

//         this.init();
//     }

//     Toggler.prototype = {
//         init: function() {

//         }
//     }


//     /*------------------------------------*\
//       EXPORT OPTIONS
//     \*------------------------------------*/
//     if (typeof define === 'function' && define.amd) {
//         define([], function() {
//             return Toggler;
//         });
//     } else if (typeof exports !== "undefined" && exports !== null) {
//         module.exports = Toggler;
//     } else {
//         window.Toggler = Toggler;
//     }


// })( jQuery, window , document );


window.Toggler = {
    /**
     * 
     */
    onReady: function onReady() {
        Toggler.event = /iPad|iPhone|iPod/.test(navigator.userAgent) ? "touchstart" : "click";

        $(Toggler.$toggler).on('click', Toggler.openToggle);
        $(document).on(Toggler.event, Toggler.detectOutsideClick);
    },

    /**
     * 
     */
    event: 'click',

    /**
     * 
     */
    $toggler: '.js-toggler',

    /**
     * 
     */
    $toggleTarget: '.js-toggler-target',

    /**
     * 
     */
    openToggle: function openToggle(event) {
        event.preventDefault();
        // get the associated toggle target
        var thisToggleTarget = $(this).attr('data-toggler-target');
        // hide any toggle target that isn't the associated target
        $(Toggler.$toggleTarget).not($("." + thisToggleTarget)).removeClass('is-revealed');

        $("." + thisToggleTarget).toggleClass('is-revealed');
    },

    /**
     * 
     */
    detectOutsideClick: function detectOutsideClick(event) {
        if (!$(event.target).closest(Toggler.$toggler + ", " + Toggler.$toggleTarget).length) {
            $(Toggler.$toggleTarget).removeClass('is-revealed');
        }
    }
};

},{}]},{},[1])

//# sourceMappingURL=toggler.js.map
