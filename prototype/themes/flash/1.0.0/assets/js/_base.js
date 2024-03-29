/**
 * Base js functions
 */

$(document).ready(function(){
    var $container = $('.maso_container');

    var gutter = 10;
    var min_width = 210;
    $container.imagesLoaded( function(){
        $container.masonry({
            itemSelector : '.box',
            gutterWidth: gutter,
            isAnimated: true,
              columnWidth: function( containerWidth ) {
                var box_width = (((containerWidth - 4*gutter)/5) | 0) ;

                if (box_width < min_width) {
                    //box_width = (((containerWidth - gutter)/2) | 0);
                    box_width = (((containerWidth - 2*gutter)/3) | 0);
                }

                if (box_width < min_width) {
                    box_width = containerWidth;
                }

                $('.box').width(box_width);

                return box_width;
              }
        });
    });
});

