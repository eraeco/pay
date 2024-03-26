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
        console.warn("personalDetails", personalDetails)
        Object.assign(localStorage, personalDetails);
        alert('done')

    })


    // this runs as an async script, so after all the other code on the page runs, this will run -- we can autofill if we're premium
    let flipMode = $('.flip')[0].classList.contains("flipit");
    // this ASSUMES that if isPremium exists, so does everything else - everything will exist if you've ever made out a check, including one to checkard. 
    if(localStorage.isPremium && flipMode === false){
        $('.address').text(localStorage.address);
        $('.fraction').text(localStorage.fraction);
        $('.inroute input').val(localStorage.routing);
        $('.inaccount input').val(localStorage.account);
        $('.number').text(++localStorage.number); // lol we can implicitly coerce from a string to a number and back to a string? nice
    }
})();