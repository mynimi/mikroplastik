var fish = $('svg g[id="fish"]'),
    teil = $('svg g[id="Teilchen"]'),
    fishToggle = $('svg g[id="fish-toggle"]'),
    text = $('svg g[id="text"]');

$(document).ready(function(){
    $('.toggler').click(function(){
        var id = $(this).attr('data-toggles-overlay');
        $('#'+id).toggleClass('open');
        $('body').css('overflow-y', 'hidden');
    });
    $('.overlay .close').click(function(){
        $(this).parent().removeClass('open');
        $('body').css('overflow-y', 'auto');
    });
    $('.toggle-box .toggles').click(function(){
        $(this).siblings('.is-toggled').slideToggle();
    });
    teil.click(function(){
        $(this).addClass('grow had-grow');
        text.addClass('visible');
    });
});
$(document).scroll(function(){
    if ( fish.isOnScreen(0.15, 0.15) ){
        teil.removeClass('grow');
        text.removeClass('visible');
    } else {
        if(teil.hasClass('had-grow')){
            teil.addClass('grow');
            text.addClass('visible');
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
