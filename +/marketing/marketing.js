;(function(){
    // insert a checkbox after the send button, then attach a listener that stashes personal details
    $('.envelope').before('<div class="floating"></div>');
    $('.envelope').wrap('<div class="anchored">');
    $('.floating').load('./+/marketing/marketing.html', function(){
        // you're not going to like this but
        // in order to have a predictable height while retaining the fading+shrinking fine print
        // we're going to duplicate that whole section, keeping invisible text at its maximum size
        // allowing the visible text to shrink without the box shrinking with it
        // this will allow us to recalculate the fixed height when window changes size
        // without having to recalc according to the text growing and shrinking
        $('.send .notice').wrap('<div class="noticeWrapper"></div>');
        $('.send .notice').clone().insertAfter('.send .notice');
        
        equalize();
        $(window).resize(equalize);

        $('.remember input').on('change', async function(eve){
            if(eve.target.checked){

            }
        })
    })

    function equalize(){
        var height = Math.max($('.anchored').height(), $('.floating').height())
        
        $('.floating').height(height);
        $('.anchored').height(height);

        $('.floating').css({
            marginTop: height + 'px',
            marginBottom: '-' + height + 'px'
        })
    }
})();