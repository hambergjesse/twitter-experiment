import schedule from "node-schedule";
import { exec } from "child_process";

function generateDailySchedule() {
  // Available hours (7 AM to 11 PM)
  const availableHours = Array.from({ length: 17 }, (_, i) => i + 7);
  const schedule = [];
  const usedHours = new Set();

  while (schedule.length < 12) {
    const hour =
      availableHours[Math.floor(Math.random() * availableHours.length)];

    // Ensure at least 1 hour between tweets
    if (!usedHours.has(hour)) {
      usedHours.add(hour);
      schedule.push({
        hour: hour,
        minute: Math.floor(Math.random() * 60),
      });
    }
  }

  // Sort by time
  return schedule.sort((a, b) =>
    a.hour === b.hour ? a.minute - b.minute : a.hour - b.hour
  );
}

// Generate schedule
const tweetTimes = generateDailySchedule();

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

// Log the schedule
console.log("\nTweet schedule for today:");
tweetTimes.forEach((time) => {
  const timeString = `${String(time.hour).padStart(2, "0")}:${String(
    time.minute
  ).padStart(2, "0")}`;
  console.log(timeString);
});

console.log("\nTwitter bot is running with the above schedule.");
