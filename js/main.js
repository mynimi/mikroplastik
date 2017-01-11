$(document).ready(function(){
    $('.toggle-box .toggles').click(function(){
        $(this).siblings('.is-toggled').slideToggle();
    });
});
