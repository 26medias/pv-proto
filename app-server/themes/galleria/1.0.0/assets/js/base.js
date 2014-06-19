/**
 * Base js functions
 */

$(document).ready(function(){
    var $container = $('.maso_container');

    var gutter = 10;
    var min_width = 210;
    $container.imagesLoaded( function(){
		$container.show();
        $container.masonry({
            itemSelector : '.box',
            gutterWidth: gutter,
            isAnimated: true,
              columnWidth: function( containerWidth ) {
                var box_width = (((containerWidth - 4*gutter)/5) | 0) ;

                if (box_width < min_width) {
                    box_width = (((containerWidth - gutter)/2) | 0);
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


$(document).ready(function(){
    var $container = $('.maso_container2');
    var gutter = 0;
    var min_width = 210;
    $container.imagesLoaded( function(){
        $container.show();
		$container.masonry({
            itemSelector : '.box2',
            gutterWidth: gutter,
            isAnimated: true,
              columnWidth: function( containerWidth ) {
                var box_width = (((containerWidth - 4*gutter)/5) | 0) ;

                if (box_width < min_width) {
                    box_width = (((containerWidth - gutter)/2) | 0);
                }

                if (box_width < min_width) {
                    box_width = containerWidth;
                }

                $('.box2').width(box_width);

                return box_width;
              }
        });
    });
});
