/*
*
* For all other functions
*
*/

$(document).ready(function () {
    // functions for collapsible sections
    var coll = document.getElementsByClassName("collapsible");
    var i;

    for (i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function () {
            this.classList.toggle("active");
            var content = this.nextElementSibling;
            if (content.style.display === "block") {
                content.style.display = "none";
            } else {
                content.style.display = "block";
            }
        });
    }

    // forms
    $('#on-campus').click(function () {
        $('#location-details').show();
        $('#location-details1').show();
        $('#location-type').text("On-Campus");
        $('#location-details2').show();
        $('#location-details3').show();
        $('#location-type1').text("On-Campus");
    });
    
    $('#off-campus').click(function () {
        $('#location-details').hide();
        $('#location-details1').show();
        $('#location-type').text("Off-Campus");
        $('#location-details2').hide();
        $('#location-details3').show();
        $('#location-type1').text("Off-Campus");
    });

    $('#tbd').click(function () {
        $('#location-details').hide();
        $('#location-details1').hide();
        $('#location-type').text("TBD");
        $('#location-details2').hide();
        $('#location-details3').hide();
        $('#location-type1').text("TBD");
    });

    $('#on-campus1').click(function () {
        $('#location-details').show();
        $('#location-details1').show();
        $('#location-type').text("On-Campus");
        $('#location-details2').show();
        $('#location-details3').show();
        $('#location-type1').text("On-Campus");
    });
    
    $('#off-campus1').click(function () {
        $('#location-details').hide();
        $('#location-details1').show();
        $('#location-type').text("Off-Campus");
        $('#location-details2').hide();
        $('#location-details3').show();
        $('#location-type1').text("Off-Campus");
    });

    $('#tbd1').click(function () {
        $('#location-details').hide();
        $('#location-details1').hide();
        $('#location-type').text("TBD");
        $('#location-details2').hide();
        $('#location-details3').hide();
        $('#location-type1').text("TBD");
    });

    $('#free-event').click(function() {
        $('#paid-event-details').hide();
        $('#budget-type').text("Yes");
    })

    $('#paid-event').click(function() {
        $('#paid-event-details').show();
        $('#budget-type').text("No");
    })
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