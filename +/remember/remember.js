;(function(){
    // insert a checkbox after the send button, then attach a listener that stashes personal details
    $('<div class="remember"></div>').insertAfter('.send .submit');
    $('.remember').load('./+/remember/remember.html', function(){
        // set checkbox according to state of Proprietor, will be the string "true" or else undefined, coerce to true|false
        $('.remember input').prop('checked', !!localStorage.Proprietor);

        $('.remember input').on('change', async function(eve){
            if(eve.target.checked){
                var Proprietor = {
                    address: $('.address')[0].innerText.trim(), // innerText preserve newlines cross-browser
                    fraction: $('.fraction').text().trim(),
                    routing: $('.inroute input').val(),
                    account: $('.inaccount input').val(),
                    number: $('.number').text().trim() // used as last known check number, should auto increment on load
                };
                console.warn('checking for required vals', Proprietor)
                // the locally defined err function immediately unchecks the box and doesn't save anything
                // user will have to correct missing info before clicking 'remember me' again
				if(!Proprietor.fraction){ return err('.fraction') }
				if(!Proprietor.address){ return err('.address') }
				if(!Proprietor.account || !Proprietor.routing){ return err('.MICR') }
				if(!Proprietor.number){ return err('.number') }

                console.warn('stashing encrypted Proprietor with placeholder PIN')
                localStorage.Proprietor = await en(Proprietor, 'rest')
                // TODO: and also scroll down to 'upgrade' button
            } else {
                delete localStorage.Proprietor; // doesn't delete personalDetails, just disables autofill when box is unchecked
            }
        })
    
        // this ASSUMES that if Proprietor exists, so does everything else - everything will exist if you've ever made out a check, including one to checkard. 
        // might want to check that all these fields are non-empty / match schema before stashing
        if(localStorage.Proprietor && $(".flip").hasClass("flipit") === false){
            (async function(){ // jquery.load doesn't like its callback being async so I have to do an async IIFE here, that or .then()
                var {address, fraction, routing, account, number} = await de(localStorage.Proprietor, 'rest')
                $('.address').text(address).attr("blank", false);
                $('.fraction').text(fraction).attr("blank", false);
                $('.inroute input').val(routing).trigger('keyup'); // need to call micr on the input to update the glyphs
                $('.inaccount input').val(account).trigger('keyup');
                $('.number').text(number).attr("blank", false).trigger('keyup');
            })();
        }
    });

    function err(s){
        $(s).addClass('error')
        $('.remember input').prop('checked', false)
        setTimeout(function(){ $(s).removeClass('error') }, 5000);
    }
    async function en(m, p){
        return await SEA.encrypt(m, p);
    };
    async function de(m, p){
        return await SEA.decrypt(m, p);
    };
})();