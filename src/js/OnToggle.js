// https://github.com/jquery-boilerplate/jquery-patterns/blob/master/patterns/jquery.basic.plugin-boilerplate.js

// the semi-colon before the function invocation is a safety
// net against concatenated scripts and/or other plugins
// that are not closed properly.
// the anonymous function protects the `$` alias from name collisions
;(function( $, window, document, undefined ) {
    let pluginName = 'OnToggle';

    /**
     * 
     */
    let defaults = {
        toggleEl: '.js-toggle',
        toggleTargetEl: '.js-toggle-target',
        isVisibleClass: 'is-visible'
    }

    /**
     * PLUGIN CONSTRUCTOR 
     */
    let OnToggle = function( options ) {
        this.options = $.extend( {}, defaults, options );
        this.init();
    }

    /**
     * 
     */
    // https://stackoverflow.com/questions/4736910/javascript-when-to-use-prototypes
    OnToggle.prototype = {
        
        /**
         * 
         */
        init: function() {
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
        checkDevice: function() {
            // if we detect an ios device, then use the `touchstart`event instead of the `click` event
            let event = (/iPad|iPhone|iPod/.test(navigator.userAgent)) ? "touchstart" : "click";
            this.eventType = event;
        },
        /**
         * 
         */
        openToggle: function(event) {
            event.preventDefault();

            // TOGGLE THIS EL'S CLASS
            $(event.target).toggleClass(this.options.isVisibleClass);

            // get the associated toggle target
            let thisToggleTargetEl = $(event.target).attr('data-toggle-target');

            // hide any toggle target that isn't the associated target
            $(this.options.toggleTargetEl).not( $(`.${thisToggleTargetEl}`) ).removeClass(this.options.isVisibleClass);
            $(`.${thisToggleTargetEl}`).toggleClass(this.options.isVisibleClass);
        },

        /**
         * 
         */
        detectOutsideClick: function(event) {
            if ( !$(event.target).closest( `${this.options.toggleEl}, ${this.options.toggleTargetEl}` ).length ) {
                $(`${this.options.toggleTargetEl}`).removeClass(this.options.isVisibleClass);
            }
        }
    }

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName,
                new OnToggle( options ));
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

})( jQuery, window , document );