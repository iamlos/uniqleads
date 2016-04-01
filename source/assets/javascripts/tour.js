/**
 * @fileOverview Class to scroll the tour
 * @author Joel Oliveira <joel@notifica.re>
 * @author Joris Verbogt <joris@notifica.re>
 */

if (typeof jQuery === "undefined") { throw new Error("Tour requires jQuery") }

(function($) {

    'use strict';

    /**
     * @param element
     * @param options
     * @constructor
     */
    function Tour(element, options) {
        this.element = $(element);
        this.nextButtonClass = options.nextButtonClass || 'next-step-tour';
        this.stepElementIdPrefix = options.stepElementIdPrefix || 'step';
        this.scrollElement = $('html, body');
        this.scrollListenerElement = $('body');
        this.step = 1;
        this.moving = false;
        this.initialScrollDuration = options.initialScrollDuration || 200;
        this.scrollDuration = options.scrollDuration || 1000;
        this.animationEffect = options.animationEffect || 'swing';
        this.max = this.element.find('h2').length;


        this.element.find('section').each(function(index, section) {
            var fixFrom = $(section).offset().top;
            fixFrom = fixFrom <= 100 ? 0 : fixFrom;
            $(section).scroggler({
                className: {
                    enter: 'is-entered',
                    leave: 'has-entered'
                },
                fixFrom: $(section).offset().top - 61,
                fixTo: $(section).offset().top + $(section).height() - 61
            });
        });

        this.element.find('.' + this.nextButtonClass).on('click', this.handleNextClick.bind(this));
        this.scrollListenerElement.on('DOMMouseScroll', this.handleDOMMouseScroll.bind(this));
        this.scrollListenerElement.on('mousewheel', this.handleMousewheel.bind(this));

        this.doAnimation(this.initialScrollDuration);
    }

    /**
     * Handle click on next step button
     * @param event
     */
    Tour.prototype.handleNextClick = function(event) {
        event.preventDefault();
        this.moveForward();
    };

    /**
     * Handle mousewheel on IE, Chrome, Safari
     * @param event
     * @returns {boolean}
     */
    Tour.prototype.handleMousewheel = function(event) {
        if (event.originalEvent.wheelDelta < 0) {
            this.moveForward();
        } else {
            this.moveBackward();
        }
        return false;
    };

    /**
     * Hanlde mousewheel on Mozilla
     * @param event
     * @returns {boolean}
     */
    Tour.prototype.handleDOMMouseScroll = function(event) {
        if (event.originalEvent.detail > 0) {
            this.moveForward();
        } else {
            this.moveBackward();
        }
        return false;
    };

    /**
     * Move forward to the next tour step
     */
    Tour.prototype.moveForward = function() {
        if (!this.moving && this.step < this.max) {
            this.step++;
            this.moving = true;
            this.doAnimation(this.scrollDuration);
        }
    };

    /**
     * Move backward to the previous tour step
     */
    Tour.prototype.moveBackward = function() {
        if (!this.moving && this.step > 1) {
            this.step--;
            this.moving = true;
            this.doAnimation(this.scrollDuration);
        }
    };

    /**
     * Animate the tour to the current step
     * @param duration
     */
    Tour.prototype.doAnimation = function(duration) {
        this.scrollElement.animate({
            scrollTop: $("#" + this.stepElementIdPrefix + this.step).offset().top - 70
        }, duration, this.animationEffect, function() {
            setTimeout(function() {
                this.moving = false;
            }.bind(this), duration);
        }.bind(this));
    };

    // export to global namespace
    window.Tour = Tour;

}(jQuery));