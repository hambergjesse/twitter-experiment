import schedule from "node-schedule";
import { exec } from "child_process";

function generateRandomTimes(numTweets = 12) {
  // Create array of all possible minutes in a day
  const allMinutes = [];
  // Start from 7:00 to 23:00 (active hours)
  for (let hour = 7; hour <= 23; hour++) {
    for (let minute = 0; minute < 60; minute++) {
      allMinutes.push({ hour, minute });
    }
  }

  const selectedTimes = [];
  while (selectedTimes.length < numTweets) {
    // Get random index
    const randomIndex = Math.floor(Math.random() * allMinutes.length);
    const newTime = allMinutes[randomIndex];

    // Check if this time is at least 1 hour away from all other selected times
    const isValidTime = selectedTimes.every((existingTime) => {
      const hourDiff = Math.abs(existingTime.hour - newTime.hour);
      const minuteDiff = Math.abs(existingTime.minute - newTime.minute);
      const totalMinutesDiff = hourDiff * 60 + minuteDiff;
      return totalMinutesDiff >= 60;
    });

    if (isValidTime) {
      selectedTimes.push(newTime);
      // Remove nearby times (within 1 hour) from allMinutes
      const removeIndex = allMinutes.findIndex(
        (time) => time.hour === newTime.hour && time.minute === newTime.minute
      );
      if (removeIndex !== -1) {
        // Remove times within 1 hour before and after
        const startRemove = Math.max(0, removeIndex - 60);
        const endRemove = Math.min(allMinutes.length, removeIndex + 60);
        allMinutes.splice(startRemove, endRemove - startRemove);
      }
    }
  }

  return selectedTimes.sort((a, b) =>
    a.hour === b.hour ? a.minute - b.minute : a.hour - b.hour
  );
}

// Generate random times for today
const tweetTimes = generateRandomTimes();

// Schedule all tweets
tweetTimes.forEach((time) => {
  schedule.scheduleJob(
    { hour: time.hour, minute: time.minute, tz: "Europe/Helsinki" },
    () => {
      console.log(`Running generateTweet.js at ${time.hour}:${time.minute}`);
      exec("node generateTweet.js", (error, stdout, stderr) => {
        if (error) {
          console.error(`Error executing generateTweet.js: ${error.message}`);
          return;
        }
        if (stderr) {
          console.error(`Error in generateTweet.js: ${stderr}`);
          return;
        }
        console.log(`Output from generateTweet.js: ${stdout}`);
      });
    }
  );
});

// Log the scheduled times
console.log("Tweet times scheduled for today:");
tweetTimes.forEach((time) => {
  console.log(
    `${String(time.hour).padStart(2, "0")}:${String(time.minute).padStart(
      2,
      "0"
    )}`
  );
});

console.log(
  "Twitter bot is running and will execute generateTweet.js at the randomly generated times."
);
