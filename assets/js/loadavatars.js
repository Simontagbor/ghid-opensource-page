var queuedActivity = [];
var lastSuccessfulFetch = []; // Caches last successful API response
var rendering = false;
const heroSquareIds = ["heroSquare1", "heroSquare2", "heroSquare3", "heroSquare4", "heroSquare5"];
const GITHUB_API_URL = 'https://api.github.com/repos/owid/owid-grapher/events';

// Fetch GitHub commits & cache response
function iteration() {
    updateRefreshFeed(false);

    $.ajax({
        type: 'GET',
        url: GITHUB_API_URL,
        dataType: 'json',
        success: function (data) {
            updateRefreshFeed(true);

            // Filter only commit events
            queuedActivity = data.filter(event => event.type === "PushEvent")
                .map(event => ({
                    id: event.id,
                    actorLogin: event.actor.login,
                    actorAvatar: event.actor.avatar_url,
                    activityUrl: event.repo ? `https://github.com/${event.repo.name}` : '#',
                }));

            // Cache the result to handle rate limits
            if (queuedActivity.length) {
                lastSuccessfulFetch = queuedActivity;
            }

            renderNext();
        },
        error: function (error) {
            console.warn('GitHub API failed, using cached avatars.');
            if (lastSuccessfulFetch.length) {
                queuedActivity = lastSuccessfulFetch;
                renderNext();
            }
        }
    });
}

// Select 5 random avatars
function getRandomAvatars(count = 5) {
    if (!queuedActivity.length) return [];
    let shuffled = queuedActivity.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

// Render avatars inside hero squares with animation
function renderNext() {
    let selectedAvatars = getRandomAvatars(heroSquareIds.length);

    heroSquareIds.forEach((squareId, index) => {
        let heroSquare = $("#" + squareId);
        heroSquare.find("image").fadeOut(500, function () { $(this).remove(); }); // Fade out old avatars

        if (selectedAvatars[index]) {
            let commit = selectedAvatars[index];
            let avatarElement = $(`
                <image x="97" y="1" width="80" height="80"
                       clip-path="url(#avatarClip)"
                       xlink:href="${commit.actorAvatar}" style="opacity: 0;" />
            `);
            heroSquare.append(avatarElement);
            avatarElement.fadeIn(500); // Fade in animation
        }
    });
}

// Insert the clipPath for circular cropping
function addClipPath() {
    $("svg").prepend(`
        <defs>
            <clipPath id="avatarClip">
                <circle cx="137" cy="41" r="40" />
            </clipPath>
        </defs>
    `);
}

// Initial setup
$(document).ready(function () {
    addClipPath();
    iteration();
    setInterval(iteration, 10000);
});
