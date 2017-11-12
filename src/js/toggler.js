// the semi-colon before the function invocation is a safety
// net against concatenated scripts and/or other plugins
// that are not closed properly.
// the anonymous function protects the `$` alias from name collisions
;(function( $, window, document, undefined ) {
    /**
     * 
     */
    let defaults = {
        togglerEl: '.js-toggler',
        togglerTargetEl: '.js-toggler-target',
        isVisibleClass: 'is-visible'
    }

    /**
     * PLUGIN CONSTRUCTOR 
     */
    let Toggler = function( options ) {
        this.options = $.extend( {}, defaults, options );
        this.init();
    }

    /**
     * 
     */
    Toggler.prototype = {
        
        /**
         * 
         */
        init: function() {
            this.checkDevice();
            $(this.options.togglerEl).on('click', this.openToggle.bind(this));
            $(document).on(this.eventType, this.detectOutsideClick.bind(this));
        },

        self: function() {
            return this;
        },
        
        /**
         * 
         */
        eventType: 'click',

        /**
         * 
         */
        checkDevice: function() {
            // if we detect an ios device, then use the `touchstart`event instead of the `click` event
            let event = (/iPad|iPhone|iPod/.test(navigator.userAgent)) ? "touchstart" : "click";
            this.event = event;
        },
        /**
         * 
         */
        openToggle: function(event) {
            event.preventDefault();
            // get the associated toggle target
            let thisTogglerTargetEl = $(event.target).attr('data-toggler-target');

            // hide any toggle target that isn't the associated target
            $(this.options.togglerTargetEl).not( $(`.${thisTogglerTargetEl}`) ).removeClass('is-revealed');
            $(`.${thisTogglerTargetEl}`).toggleClass(this.options.isVisibleClass);
        },

        /**
         * 
         */
        detectOutsideClick: function(event) {
            if ( !$(event.target).closest( `${this.options.togglerEl}, ${this.options.togglerTargetEl}` ).length ) {
                $(`${this.options.togglerTargetEl}`).removeClass(this.options.isVisibleClass);
            }
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
    window.Toggler = Toggler;


})( jQuery, window , document );