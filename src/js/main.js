var event = (/iPad|iPhone|iPod/.test(navigator.userAgent)) ? "touchstart" : "click";

$('.js-toggler').on('click', function(e) {
    e.preventDefault();
    let target = $(this).attr('data-toggler-target');

    $('.js-toggler-target').not( $(`.${target}`) ).removeClass('is-revealed');

    $(`.${target}`).toggleClass('is-revealed');
    
});


$(document).on(event, function(e) {
    console.log('click');
    if ( !$(e.target).closest('.js-toggler, .js-toggler-target').length ) {
        $('.js-toggler-target').removeClass('is-revealed');
    }
});