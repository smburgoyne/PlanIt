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
    $('#location-dropdown-button').prop('disabled', false);
    $('#place').prop('disabled', false);
    $('#about').prop('disabled', false);
    $('#planner').prop('disabled', false);
    $('#submit1').prop('disabled', false);
    $('#cancel1').prop('disabled', false);

    $('#budget-dropdown-button').prop('disabled', false);
    $('#request-budget-button').prop('disabled', false);
    $('#supplies-list-button').prop('disabled', false);
    $('#list-link').prop('disabled', false);
    $('#request-reimbursement-button').prop('disabled', false);
    $('#submit2').prop('disabled', false);
    $('#cancel2').prop('disabled', false);

    $('#date2').prop('disabled', false);
    $('#location-dropdown-button1').prop('disabled', false);
    $('#place2').prop('disabled', false);
    $('#time2').prop('disabled', false);
    $('#supplies-list-button1').prop('disabled', false);
    $('#list-link2').prop('disabled', false);
    $('#signin-form-button').prop('disabled', false);
    $('#signin-link').prop('disabled', false);
    $('#volunteer-form-button').prop('disabled', false);
    $('#volunteer-link').prop('disabled', false);
    $('#carpool-form-button').prop('disabled', false);
    $('#carpool-link').prop('disabled', false);
    $('#submit3').prop('disabled', false);
    $('#cancel3').prop('disabled', false);

    $('#request-ad-button').prop('disabled', false);
    $('#submit4').prop('disabled', false);
    $('#cancel4').prop('disabled', false);

    $('#feedback-form-button').prop('disabled', false);
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
    $('#list-link').val("");
    $('#list-link2').val("");
    $('#signin-link').val("");
    $('#volunteer-link').val("");
    $('#carpool-link').val("");

    $('#detail-title').text("Create New Event");
    $('#location-type').text("Where is the event happening?");
    $('#location-details').hide();
    $('#location-details1').hide();
    $('#location-details2').hide();
    $('#location-details3').hide();
    $('#location-type1').text("Where is the event happening?");
    $('#paid-event-details').hide();
    $('#budget-type').text("Choose an option");

    $('#name').prop('disabled', false);
    $('#date').prop('disabled', false);
    $('#time').prop('disabled', false);
    $('#location-dropdown-button').prop('disabled', false);
    $('#place').prop('disabled', false);
    $('#about').prop('disabled', false);
    $('#planner').prop('disabled', false);
    $('#submit1').prop('disabled', false);
    $('#cancel1').prop('disabled', false);

    $('#budget-dropdown-button').prop('disabled', true);
    $('#request-budget-button').prop('disabled', true);
    $('#supplies-list-button').prop('disabled', true);
    $('#list-link').prop('disabled', true);
    $('#request-reimbursement-button').prop('disabled', true);
    $('#submit2').prop('disabled', true);
    $('#cancel2').prop('disabled', true);

    $('#date2').prop('disabled', true);
    $('#location-dropdown-button1').prop('disabled', true);
    $('#place2').prop('disabled', true);
    $('#time2').prop('disabled', true);
    $('#supplies-list-button1').prop('disabled', true);
    $('#list-link2').prop('disabled', true);
    $('#signin-form-button').prop('disabled', true);
    $('#signin-link').prop('disabled', true);
    $('#volunteer-form-button').prop('disabled', true);
    $('#volunteer-link').prop('disabled', true);
    $('#carpool-form-button').prop('disabled', true);
    $('#carpool-link').prop('disabled', true);
    $('#submit3').prop('disabled', true);
    $('#cancel3').prop('disabled', true);

    $('#request-ad-button').prop('disabled', true);
    $('#submit4').prop('disabled', true);
    $('#cancel4').prop('disabled', true);

    $('#feedback-form-button').prop('disabled', true);
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
    $('#location-dropdown-button').prop('disabled', true);
    $('#place').prop('disabled', true);
    $('#about').prop('disabled', true);
    $('#planner').prop('disabled', true);
    $('#submit1').prop('disabled', true);
    $('#cancel1').prop('disabled', true);

    $('#budget-dropdown-button').prop('disabled', true);
    $('#request-budget-button').prop('disabled', true);
    $('#supplies-list-button').prop('disabled', true);
    $('#list-link').prop('disabled', true);
    $('#request-reimbursement-button').prop('disabled', true);
    $('#submit2').prop('disabled', true);
    $('#cancel2').prop('disabled', true);

    $('#date2').prop('disabled', true);
    $('#location-dropdown-button1').prop('disabled', true);
    $('#place2').prop('disabled', true);
    $('#time2').prop('disabled', true);
    $('#supplies-list-button1').prop('disabled', true);
    $('#list-link2').prop('disabled', true);
    $('#signin-form-button').prop('disabled', true);
    $('#signin-link').prop('disabled', true);
    $('#volunteer-form-button').prop('disabled', true);
    $('#volunteer-link').prop('disabled', true);
    $('#carpool-form-button').prop('disabled', true);
    $('#carpool-link').prop('disabled', true);
    $('#submit3').prop('disabled', true);
    $('#cancel3').prop('disabled', true);

    $('#request-ad-button').prop('disabled', true);
    $('#submit4').prop('disabled', true);
    $('#cancel4').prop('disabled', true);

    $('#feedback-form-button').prop('disabled', true);
    $('#notes').prop('disabled', true);
    $('#submit5').prop('disabled', true);
    $('#cancel5').prop('disabled', true);
    
    $('#submit').prop('disabled', true);
}