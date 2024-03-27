;(function(){
    // we can attach multiple actions to a single button click, in this case, index.html attaches an onsubmit that leads to the email action
    // be we can also stash check values into localstorage from here
    $('.send button').on('click', async function(){
        var personalDetails = {
            address: $('.address')[0].innerText.trim(), // innerText preserve newlines cross-browser
            fraction: $('.fraction').text().trim(),
            routing: $('.inroute input').val(),
            account: $('.inaccount input').val(),
            number: $('.number').text().trim() // used as last known check number, should auto increment on load
        };
        console.warn("stashing personal details locally", personalDetails)
        Object.assign(localStorage, personalDetails);
    })

    // this runs as a deferred script, so after the document is parsed, this will run -- we can autofill if we're premium
    // this ASSUMES that if isPremium exists, so does everything else - everything will exist if you've ever made out a check, including one to checkard. 
    if(localStorage.isPremium && $(".flip").hasClass("flipit") === false){
        $('.address').text(localStorage.address).attr("blank", false);
        $('.fraction').text(localStorage.fraction).attr("blank", false);
        $('.inroute input').val(localStorage.routing).trigger('keyup'); // need to call micr on the input to update the glyphs
        $('.inaccount input').val(localStorage.account).trigger('keyup');
        $('.number').text(++localStorage.number).attr("blank", false); // lol we can implicitly coerce from a string to a number and back to a string? nice
    }
})();