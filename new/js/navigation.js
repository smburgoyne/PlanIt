/*
*
* For functions related to navigating the app
*
*/

$(document).ready(function ()
{
    $("#home-tab-button").click(function () {
        $('#home').show();
        $('#event-details').hide();
        $('#all-events').hide();
    });

    $("#new-tab-button").click(function () {
        resetNewEventPage();

        $('#home').hide();
        $('#event-details').show();
        $('#all-events').hide();
    });

    $("#all-tab-button").click(function () {
        $('#home').hide();
        $('#event-details').hide();
        $('#all-events').show();
    });

    $('#new-event-button').click(function() {
        resetNewEventPage();

        $('#home').hide();
        $('#event-details').show();
        $('#all-events').hide();
    });

    $("#all-events-button").click(function () {
        $('#home').hide();
        $('#event-details').hide();
        $('#all-events').show();
    }); 

    $('#logout').click(function() {
        // reset pages
        $('#home').show();
        $('#event-details').hide();
        $('#all-events').hide();
        resetNewEventPage();

        $('#uname').val("");
        $('#password').val("");
        $('#login-error').text("");

        $('#login').show();
        $('#main-app').hide();
    });
})

// Enable all new event inputs
function enableAllInputs()
{
    $('#name').prop('disabled', false);
    $('#date').prop('disabled', false);
    $('#time').prop('disabled', false);
    $('#place').prop('disabled', false);
    $('#about').prop('disabled', false);
    $('#planner').prop('disabled', false);
    $('#submit1').prop('disabled', false);
    $('#cancel1').prop('disabled', false);

    // enable finance buttons

    $('#date2').prop('disabled', false);
    $('#place2').prop('disabled', false);
    $('#time2').prop('disabled', false);
    // enable other logistics buttons
    $('#submit3').prop('disabled', false);
    $('#cancel3').prop('disabled', false);

    // enable marketing buttons

    $('#notes').prop('disabled', false);
    $('#submit5').prop('disabled', false);
    $('#cancel5').prop('disabled', false);
    
    $('#submit').prop('disabled', false);
}

// Reset inputs for new event page
function resetNewEventPage()
{
    var name = $('#name').val("");
    var date = $('#date').val("");
    var time = $('#time').val("");
    $('#date2').val("");
    $('#place2').val("");
    $('#about').val("")
    $('#time2').val("");
    $("#notes").val("");
    var location = $('#place').val("");
    $('#planner').val("");
    $('#progressbar > div').css('width', '0%');
    completion = 0;

    $('#detail-title').text("Create New Event");

    $('#name').prop('disabled', false);
    $('#date').prop('disabled', false);
    $('#time').prop('disabled', false);
    $('#place').prop('disabled', false);
    $('#about').prop('disabled', false);
    $('#planner').prop('disabled', false);
    $('#submit1').prop('disabled', false);
    $('#cancel1').prop('disabled', false);

    // disable finance buttons

    $('#date2').prop('disabled', true);
    $('#place2').prop('disabled', true);
    $('#time2').prop('disabled', true);
    // disable other logistics buttons
    $('#submit3').prop('disabled', true);
    $('#cancel3').prop('disabled', true);

    // disable marketing buttons

    $('#notes').prop('disabled', true);
    $('#submit5').prop('disabled', true);
    $('#cancel5').prop('disabled', true);

    $('#submit').prop('disabled', true);
}

// Disable all new event inputs
function disableAllInputs() 
{
    $('#name').prop('disabled', true);
    $('#date').prop('disabled', true);
    $('#time').prop('disabled', true);
    $('#place').prop('disabled', true);
    $('#about').prop('disabled', true);
    $('#planner').prop('disabled', true);
    $('#submit1').prop('disabled', true);
    $('#cancel1').prop('disabled', true);

    // disable finance buttons

    $('#date2').prop('disabled', true);
    $('#place2').prop('disabled', true);
    $('#time2').prop('disabled', true);
    // disable other logistics buttons
    $('#submit3').prop('disabled', true);
    $('#cancel3').prop('disabled', true);

    // disable marketing buttons

    $('#notes').prop('disabled', true);
    $('#submit5').prop('disabled', true);
    $('#cancel5').prop('disabled', true);

    $('#submit').prop('disabled', true);
}