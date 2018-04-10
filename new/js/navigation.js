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
        $('#home').hide();
        $('#event-details').show();
        $('#all-events').hide();
    });

    $("#all-tab-button").click(function () {
        $('#home').hide();
        $('#event-details').hide();
        $('#all-events').show();
    });
})