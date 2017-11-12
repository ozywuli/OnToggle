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
    onReady: function() {
        Toggler.event = (/iPad|iPhone|iPod/.test(navigator.userAgent)) ? "touchstart" : "click";

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
    openToggle: function(event) {
        event.preventDefault();
        // get the associated toggle target
        let thisToggleTarget = $(this).attr('data-toggler-target');
        // hide any toggle target that isn't the associated target
        $(Toggler.$toggleTarget).not( $(`.${thisToggleTarget}`) ).removeClass('is-revealed');

        $(`.${thisToggleTarget}`).toggleClass('is-revealed');
    },

    /**
     * 
     */
    detectOutsideClick: function(event) {
        if ( !$(event.target).closest( `${Toggler.$toggler}, ${Toggler.$toggleTarget}` ).length ) {
            $(Toggler.$toggleTarget).removeClass('is-revealed');
        }
    }
}
