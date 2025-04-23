function getTrendIcon(status) {
    switch (status.toLowerCase()) {
      case "stagnating":
        return `<i class="fa-light fa-caret-right fa-lg fa-beat-fade" style="color: #ff7300;"></i>`;
      case "moderately improving":
        return `<i class="fa-light fa-caret-down fa-rotate-by fa-lg fa-beat-fade" style="color: #FFD43B; --fa-rotate-angle: 226deg;"></i>`;
      case "improving":
        return `<i class="fa-light fa-caret-down fa-rotate-180 fa-lg fa-beat-fade" style="color: #49c167;"></i>`;
      case "decreasing":
        return `<i class="fa-light fa-caret-down fa-rotate-by fa-lg fa-beat-fade" style="color: #ff3d3d; --fa-rotate-angle: 360deg;"></i>`;
      case "unavailable":
      default:
        return `<i class="fa-solid fa-question fa-beat-fade" style="color: #bfc3ca;"></i>`;
    }
  }
    // // Add event listener to the window object
    // window.addEventListener("load", function() {
    //   // Get all elements with the class "sdg-goal"
    //   const sdgGoals = document.querySelectorAll(".sdg-goal");
  
    //   // Loop through each element
    //   sdgGoals.forEach((goal) => {
    //     // Get the status from the data attribute
    //     const status = goal.getAttribute("data-status");
  
    //     // Get the trend icon based on the status
    //     const trendIcon = getTrendIcon(status);
  
    //     // Create a new span element for the trend icon
    //     const trendIconElement = document.createElement("span");
    //     trendIconElement.innerHTML = trendIcon;
  
    //     // Append the trend icon to the goal element
    //     goal.appendChild(trendIconElement);
    //   });
    // });  