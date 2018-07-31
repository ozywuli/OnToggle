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
;(function( $, window, document, undefined ) {
    /**
     * Plugin namespace
     */
    let namespace = {
        pluginName: 'OnToggle'
    };

    /**
     * Defaults
     */
    let defaults = {
        toggleEl: '.js-ontoggle-toggler',
        toggleTriggerEl: '.js-ontoggle-trigger',
        toggleTargetEl: '.js-ontoggle-target',
        isVisibleClass: 'is-visible',
        done: function(context) {

        }
    }

    /**
     * Plugin Constructor
     */
    namespace['pluginName'] = function( options ) {
        this.options = $.extend( {}, defaults, options );
        this.init();
    }


    /**
     * Prototype
     */
    // https://stackoverflow.com/questions/4736910/javascript-when-to-use-prototypes
    namespace['pluginName'].prototype = {
        
        /**
         * Init
         */
        init: function() {
            this.checkDevice();
            
            // ADD CLICK EVENT TO TOGGLE ELEMENT
            $(this.options.toggleEl).on('click', this.openToggle.bind(this));

            // REMOVE CLICK EVENT ON CHILD ELEMENTS
            $(this.options.toggleEl).children().css('pointer-events', 'none');

            // CLICK ANYWHERE BUT THE TOGGLE ELEMENT AND THE TARGET FROM TO DEACTIVATE
            $(document).on(this.eventType, this.detectOutsideClick.bind(this));
        },
        
        /**
         * Event type
         * 
         */
        eventType: 'click',

        /**
         * Toggle Properties
         */
        toggleProps: {
            isToggled: false,
            prevToggle: false,
            currentToggle: false
        },

        /**
         * Check device
         */
        checkDevice: function() {
            // if we detect an ios device, then use the `touchstart`event instead of the `click` event
            let event = (/iPad|iPhone|iPod/.test(navigator.userAgent)) ? "touchstart" : "click";
            this.eventType = event;
        },

        /**
         * Trigger toggle
         */
        triggerToggle: function(context) {
            this.openToggle(null, context);
        },

        /**
         *  Open toggle
         */
        openToggle: function(event, context) {
            let thisToggleTargetEl;

            if (event) {
                event.preventDefault();

                // get the associated toggle target
                thisToggleTargetEl = $(event.target).attr('data-ontoggle-target');
            }

            if (context) {
                thisToggleTargetEl = context;
            }

            if (!(this.toggleProps.currentToggle === thisToggleTargetEl)) {
                this.toggleProps.currentToggle = thisToggleTargetEl;
                this.toggleProps.isToggled = true;
            } else {
                this.toggleProps.isToggled = this.toggleProps.isToggled ? false : true; 
            }

            // hide any toggles that isn't toggled
            $(this.options.toggleEl).not( $(`${this.options.toggleEl}[data-ontoggle-target=${thisToggleTargetEl}]`) ).removeClass(this.options.isVisibleClass);

            // TOGGLE THIS EL'S CLASS
            $(`${this.options.toggleEl}[data-ontoggle-target=${thisToggleTargetEl}]`).toggleClass(this.options.isVisibleClass);

            // hide any toggle target that isn't the associated target
            $(this.options.toggleTargetEl).not( $(`${this.options.toggleTargetEl}[data-ontoggle-target=${thisToggleTargetEl}]`) ).removeClass(this.options.isVisibleClass);

            // toggle the class of the target element
            $(`${this.options.toggleTargetEl}[data-ontoggle-target=${thisToggleTargetEl}]`).toggleClass(this.options.isVisibleClass);

            // Callback
            this.options.done(event, thisToggleTargetEl);
        },

        /**
         * Detect outside click
         */
        detectOutsideClick: function(event) {
            if ( !$(event.target).closest(`
                    ${this.options.toggleEl},
                    ${this.options.toggleTriggerEl}, 
                    ${this.options.toggleTargetEl}
                `).length 
            ) {
                // Remove visibility class from all toggled elements and targets
                $(`${this.options.toggleEl}, ${this.options.toggleTargetEl}`).removeClass(this.options.isVisibleClass);

                // Set isToggled to be false
                this.toggleProps.isToggled = this.toggleProps.prevToggle = this.toggleProps.currentToggle = false;

                // Callback
                this.options.done();
            }
        }
    }

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[namespace['pluginName']] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + namespace['pluginName'])) {
                $.data(this, "plugin_" + namespace['pluginName'],
                new OnToggle( options ));
            }
        });
    };

    /*------------------------------------*\
      EXPORT OPTIONS
    \*------------------------------------*/
    module.exports = namespace['pluginName'];

})( jQuery, window , document );