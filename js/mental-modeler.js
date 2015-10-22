var mm = mm || {};
mm.sendEnabled = false;

function updateHeaderHeight() {
    $("#content").css("top", $("#headerContainer").height() + "px");    
}

function isEmail(email) {
    var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}

$(document).ready(function() {
    
    updateHeaderHeight()

    var $root = $('html, body');
    var $content = $("#content");
    var sections = ["#content", "#download", "#whatisfcm", "#resources", "#about"];
    var hash = window.location.hash;

    if ( sections.indexOf(hash) !== -1 ) {
        
        $root.animate({
            scrollTop: $content.find(hash).offset().top - $("#headerContainer").height()
        }, 1);
    }
   
    $('a').click(function() {
        var href = $.attr(this, 'href')
        //console.log("href:"+href);
        //console.log( "href.indexOf(#):"+href.indexOf("#") );
        if ( href.indexOf("#") !== -1) {
            $root.animate({
                scrollTop: $content.find(href).offset().top - $("#headerContainer").height()
            }, 500, function () {
                window.location.hash = href;
            });
            return false;
        }
        else
            return true;
    });    
   
    $('#send_message').on( "click", {mm: mm}, function(e){
        var mm = e.data.mm;
        e.preventDefault();
        var email = $('#email').val();
        //console.log('submit email callback');
        //console.log('     mm:',mm,', isEmail( $(#email).val() ):',isEmail( $('#email').val() ),', $(#contact_form).serialize():',$("#contact_form").serialize());
        
        if ( isEmail( $('#email').val() ) && mm.sendEnabled) {
            mm.sendEnabled = false;
            $.post("email.php", $("#contact_form").serialize(), function() { console.log('     post'); })
            .done( function() {
                $("#send-success-message").removeClass("send-hidden");
                console.log('     done');
            })
            .fail(function() {
                $("#send-failure-message").removeClass("send-hidden");
                console.log('     fail');
            })
            .always(function() {
                $("#send_message").addClass("disabled");
                console.log('     always');
            });
        }
    });

    $("#email").bind( "input", {isEmail: isEmail, mm: mm}, function(e) {
        var mm = e.data.mm;
        var email = $(this).val();
        $("#send-success-message").addClass("send-hidden");
        $("#send-failure-message").addClass("send-hidden");
        if (isEmail( email ) ) {
            mm.sendEnabled = true;
            $("#send_message").removeClass("disabled");
        }
        else {
            mm.sendEnabled = false;
            $("#send_message").addClass("disabled");
        } 
    })
})

$(window).resize(function() {
  updateHeaderHeight();
});


