;(function(){
    // insert a checkbox after the send button, then attach a listener that stashes personal details
    $('<div class="remember"></div>').insertAfter('.send .submit');
    $('.remember').load('./+/remember/remember.html', function(){
        // set checkbox according to state of Proprietor, will be the string "true" or else undefined, coerce to true|false
        $('.remember input').prop('checked', Boolean(localStorage.Proprietor));

        $('.remember input').on('change', async function(eve){
            if(eve.target.checked){
                localStorage.Proprietor = true; // gets converted to string "true", just has to be truthy
                var personalDetails = {
                    address: $('.address')[0].innerText.trim(), // innerText preserve newlines cross-browser
                    fraction: $('.fraction').text().trim(),
                    routing: $('.inroute input').val(),
                    account: $('.inaccount input').val(),
                    number: $('.number').text().trim() // used as last known check number, should auto increment on load
                };
                console.warn("stashing personal details locally", personalDetails)
                Object.assign(localStorage, personalDetails);
                // TODO: and also scroll down to 'upgrade' button
            } else {
                delete localStorage.Proprietor; // doesn't delete personalDetails, just disables autofill when box is unchecked
            }
        })
    
        // this ASSUMES that if Proprietor exists, so does everything else - everything will exist if you've ever made out a check, including one to checkard. 
        // might want to check that all these fields are non-empty / match schema before stashing
        if(localStorage.Proprietor && $(".flip").hasClass("flipit") === false){
            $('.address').text(localStorage.address).attr("blank", false);
            $('.fraction').text(localStorage.fraction).attr("blank", false);
            $('.inroute input').val(localStorage.routing).trigger('keyup'); // need to call micr on the input to update the glyphs
            $('.inaccount input').val(localStorage.account).trigger('keyup');
            $('.number').text(++localStorage.number).attr("blank", false); // lol we can implicitly coerce from a string to a number and back to a string? nice
        }
    })
})();