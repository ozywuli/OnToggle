$('.js-toggler').on('click', function(e) {
    e.preventDefault();
    let target = $(this).attr('data-toggler-target');

    $('.js-toggler-target').not( $(`.${target}`) ).removeClass('is-revealed');

    $(`.${target}`).toggleClass('is-revealed');
    
});


$(document).on('click', function(e) {
    if ( !$(e.target).closest('.js-toggler, .js-toggler-target').length ) {
        $('.js-toggler-target').removeClass('is-revealed');
    }
});