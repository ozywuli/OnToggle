(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

$('.js-toggler').on('click', function (e) {
    e.preventDefault();
    var target = $(this).attr('data-toggler-target');

    $('.js-toggler-target').not($('.' + target)).removeClass('is-revealed');

    $('.' + target).toggleClass('is-revealed');
});

$(document).on('click', function (e) {
    if (!$(e.target).closest('.js-toggler, .js-toggler-target').length) {
        $('.js-toggler-target').removeClass('is-revealed');
    }
});

},{}]},{},[1])

//# sourceMappingURL=main.js.map
