$(document).ready(function() {
    function fetchActivities() {
        $.ajax({
            type: 'GET',
            url: 'https://api.github.com/users/Simontagbor/events', // Update this URL to the correct endpoint
            dataType: 'json',
            success: function(data) {
                if (data && data.length > 0) {
                    renderActivities(data);
                }
            },
            error: function(error) {
                console.error('Error fetching activities:', error);
            }
        });
    }

    function renderActivities(activities) {
        var templateSource = $('#activity-template').html();
        var template = Handlebars.compile(templateSource);
        var html = template({ activities: activities });
        $('#activityList').html(html);
        $('.activity').show(); // Show the activities after rendering
    }

    fetchActivities();
});
