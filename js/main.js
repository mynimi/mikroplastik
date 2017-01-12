var fish = $('svg g[id="fish"]'),
    teil = $('svg g[id="Teilchen"]'),
    primary = $('svg text[class="primary"]'),
    secondary = $('svg text[class="secondary"]');

$(document).ready(function(){
    $('.toggle-box .toggles').click(function(){
        $(this).siblings('.is-toggled').slideToggle();
    });
    teil.click(function(){
        $(this).addClass('grow had-grow');
        primary.addClass('visible');
        secondary.addClass('visible');
    });
});
$(document).scroll(function(){
    if ( fish.isOnScreen(0.5, 0.5) ){
        teil.removeClass('grow');
        primary.removeClass('visible');
        secondary.removeClass('visible');
    } else {
        if(teil.hasClass('had-grow')){
            teil.addClass('grow');
            primary.addClass('visible');
            secondary.addClass('visible');
        }
    }
});

// Plugin from: https://github.com/moagrius/isOnScreen
(function ($) {

    $.fn.isOnScreen = function(x, y){

        if(x == null || typeof x == 'undefined') x = 1;
        if(y == null || typeof y == 'undefined') y = 1;

        var win = $(window);

        var viewport = {
            top : win.scrollTop(),
            left : win.scrollLeft()
        };
        viewport.right = viewport.left + win.width();
        viewport.bottom = viewport.top + win.height();

        var height = this.outerHeight();
        var width = this.outerWidth();

        if(!width || !height){
            return false;
        }

        var bounds = this.offset();
        bounds.right = bounds.left + width;
        bounds.bottom = bounds.top + height;

        var visible = (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));

        if(!visible){
            return false;
        }

        var deltas = {
            top : Math.min( 1, ( bounds.bottom - viewport.top ) / height),
            bottom : Math.min(1, ( viewport.bottom - bounds.top ) / height),
            left : Math.min(1, ( bounds.right - viewport.left ) / width),
            right : Math.min(1, ( viewport.right - bounds.left ) / width)
        };

        return (deltas.left * deltas.right) >= x && (deltas.top * deltas.bottom) >= y;

    };

})(jQuery);
