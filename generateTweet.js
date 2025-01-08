import dotenv from "dotenv";
import { TwitterApi } from "twitter-api-v2";
import Anthropic from "@anthropic-ai/sdk";

dotenv.config();

const prompts = [
  // Gaming + Loneliness (Extended)
  "write a tweet about playing valorant alone at 3am because you can't sleep, include soft sad vibes, lowercase, no emojis",
  "create a tweet about grinding ranked in league all weekend and still being hardstuck, add self-deprecating humor, lowercase, no emojis",
  "write a tweet about how you miss having someone to play minecraft with and build cute houses together, add gentle yearning, lowercase, no emojis",
  "generate a tweet about being too anxious to use voice chat in valorant even though you want to make friends, lowercase, no emojis",
  "write a tweet about staying up all night playing league just to avoid being alone with your thoughts, lowercase, no emojis",
  "create a tweet about missing when you had a full valorant stack to play with every night, lowercase, no emojis",
  "write a tweet about your roblox boyfriend being the only stable relationship you've had this year, add self-deprecating humor, lowercase, no emojis",
  "generate a tweet about pretending to be afk in minecraft because you're crying irl, lowercase, no emojis",

  // Gaming + Observations (Extended)
  "write a tweet about how attractive it is when someone carries you in ranked without being toxic about it, lowercase, no emojis",
  "create a tweet about spending way too much money on infinity nikki outfits instead of paying bills, add self-aware humor, lowercase, no emojis",
  "write a tweet about being terrible at marvel rivals but still playing because the characters are pretty, lowercase, no emojis",
  "generate a tweet about your roblox boyfriend breaking up with you after you spent robux on him, add dramatic sadness, lowercase, no emojis",
  "write a tweet about how you're only good at support characters because you're used to taking care of everyone irl, lowercase, no emojis",
  "create a tweet about your league match history being all losses but at least your character looked cute, lowercase, no emojis",
  "write a tweet about buying a new gaming chair hoping it would make you better at valorant but you're still bad, lowercase, no emojis",
  "generate a tweet about having perfect aim in valorant but only when you're playing alone in the range, lowercase, no emojis",

  // Mental Health + Relatable (Extended)
  "write a tweet about apologizing for apologizing too much and knowing you'll do it again, lowercase, no emojis",
  "create a tweet about having a mental breakdown in discord vc while your friends comfort you, lowercase, no emojis",
  "write a tweet about how you let everything bother you and overthink every interaction, lowercase, no emojis",
  "generate a tweet about wanting to make friends but only being able to reply 'real' to tweets, add self-deprecating humor, lowercase, no emojis",
  "write a tweet about catching yourself trauma dumping in team chat during a ranked match, lowercase, no emojis",
  "create a tweet about your discord status being your only way to express emotions, lowercase, no emojis",
  "write a tweet about pretending to be afk because you're overwhelmed by social interaction, lowercase, no emojis",
  "generate a tweet about your gaming sessions being your therapy sessions, lowercase, no emojis",

  // Loneliness + Dating (Extended)
  "write a tweet about missing sleep calls and falling asleep to someone's voice, add gentle yearning, lowercase, no emojis",
  "create a tweet about wanting a gaming partner but being too awkward to flirt in game chat, lowercase, no emojis",
  "write a tweet about being touch starved and just wanting to be held, keep it soft and sad, lowercase, no emojis",
  "generate a tweet about still thinking about your discord kitten from 2023, add dramatic yearning, lowercase, no emojis",
  "write a tweet about developing a crush on someone just because they protected you in league, lowercase, no emojis",
  "create a tweet about missing your toxic league duo partner even though they were bad for you, lowercase, no emojis",
  "write a tweet about wanting someone to carry you in ranked and in life, lowercase, no emojis",
  "generate a tweet about your discord nitro subscription being longer than any of your relationships, lowercase, no emojis",

  // Random Thoughts (Extended)
  "write a tweet about bed rotting and playing games all weekend with no regrets, lowercase, no emojis",
  "create a tweet about your gaming setup being the only thing you take care of in your life, add self-aware humor, lowercase, no emojis",
  "write a tweet about being chronically online and proud of it, add internet humor, lowercase, no emojis",
  "generate a tweet about how you'll probably still be single next year but at least your gaming skills are improving, lowercase, no emojis",
  "write a tweet about your room being a mess but your gaming desktop is spotless, lowercase, no emojis",
  "create a tweet about spending your entire paycheck on gaming accessories and instant ramen, lowercase, no emojis",
  "write a tweet about your sleep schedule being completely ruined because of late night gaming sessions, lowercase, no emojis",
  "generate a tweet about your camera roll being full of gaming screenshots instead of selfies, lowercase, no emojis",

  // Gaming Frustrations (Extended)
  "write a tweet about tilting in ranked and needing someone to tell you it's just a game, lowercase, no emojis",
  "create a tweet about being hardstuck in valorant but at least you're pretty irl, add self-deprecating humor, lowercase, no emojis",
  "write a tweet about rage quitting league and switching to minecraft to calm down, lowercase, no emojis",
  "generate a tweet about being too tired to play well but too stubborn to stop queuing, lowercase, no emojis",
  "write a tweet about going 0/10 in league but still thinking you deserve a higher rank, lowercase, no emojis",
  "create a tweet about your team blaming you but you're too pretty to be this bad at games, lowercase, no emojis",
  "write a tweet about uninstalling valorant for the fifth time this week, lowercase, no emojis",
  "generate a tweet about bottom fragging but having the best callouts, lowercase, no emojis",

  // Internet Culture (New Category)
  "write a tweet about your spotify wrapped being all sad girl music, lowercase, no emojis",
  "create a tweet about typing 'real' and 'me' under every relatable post you see, lowercase, no emojis",
  "write a tweet about your discord profile being more aesthetic than your real life, lowercase, no emojis",
  "generate a tweet about changing your discord status every hour to match your mood, lowercase, no emojis",
  "write a tweet about your pinterest board being full of setup aesthetics you can't afford, lowercase, no emojis",
  "create a tweet about your tiktok fyp knowing you're touch starved and lonely, lowercase, no emojis",
  "write a tweet about your discord notifications being the only ones you get excited about, lowercase, no emojis",
  "generate a tweet about being more active in discord than in real life conversations, lowercase, no emojis",

  // Self-Care & Gaming (New Category)
  "write a tweet about skipping meals to play one more ranked game, lowercase, no emojis",
  "create a tweet about your skincare routine being the only routine you stick to besides gaming, lowercase, no emojis",
  "write a tweet about buying a new gaming mouse instead of going to therapy, lowercase, no emojis",
  "generate a tweet about your valorant aim being better than your life decisions, lowercase, no emojis",
  "write a tweet about playing support because you're used to putting others first irl too, lowercase, no emojis",
  "create a tweet about your room being messy but your gaming setup is immaculate, lowercase, no emojis",
  "write a tweet about needing someone to take care of you like you take care of your teammates, lowercase, no emojis",
  "generate a tweet about your game inventory being more organized than your life, lowercase, no emojis",

  // Late Night Gaming Thoughts (New Category)
  "write a tweet about playing until sunrise because sleep is for the weak, lowercase, no emojis",
  "create a tweet about matching with the same toxic player three games in a row at 4am, lowercase, no emojis",
  "write a tweet about late night queue times being longer than your attention span, lowercase, no emojis",
  "generate a tweet about playing badly because you're tired but refusing to sleep, lowercase, no emojis",
  "write a tweet about late night gaming sessions being your only peace, lowercase, no emojis",
  "create a tweet about your sleep schedule being ruined because of 'one more game', lowercase, no emojis",
  "write a tweet about the 3am ranked grind hitting different, lowercase, no emojis",
  "generate a tweet about night time being the only time you can game without anxiety, lowercase, no emojis",
];

// Initialize Claude client
const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY,
});

// Initialize Twitter client
const twitterClient = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_SECRET,
});

// Generate a tweet using Claude API
async function generateTweet(prompt) {
  try {
    const completion = await anthropic.messages.create({
      model: "claude-3-sonnet-20240229",
      max_tokens: 150,
      temperature: 0.9,
      messages: [
        {
          role: "user",
          content: `${prompt}\n\nRules:\n- Must sound like an e-girl tweeting casual thoughts\n- Keep it short and relatable\n- No proper grammar needed\n- Maximum 60 characters ideal\n- Mix gaming references with personal thoughts\n\nExamples of the right style:\n"crying in vc again bestie :3"\n"need a gaming daddy to carry me uwu"\n"literally meowing at my teammates rn"\n"ur e-kitten is hardstuck bronze </3"\n"pls be my duo i'm actually crying"\n"another mental breakdown in ranked >_<"\n"might be bad at val but at least im cute :3"\n"someone pls hold my hand while i rank up ʕ•ᴥ•ʔ"\n"daddy issues gaming arc :3"\n"cant sleep thinking about my toxic ex"\n"literally just want someone to ruin my life again"\n"why do i only attract league players </3"\n"having a breakdown but make it cute"\n"3am and body checking again bestie"\n"trauma dumping in val chat rn"\n"why do i miss toxic guys sm"\n"sleep schedule broken but at least im pretty"\n"stop being mean to me im literally so small"\n"my mental health is gonna make someone's villain arc"\n"meowing at my teammates for heals uwu"\n"ur fav e-kitten needs a carry :3"\n"literally crying in bronze lobbies rn"\n"need gaming headpats pls >_<"\n"miss building minecraft houses w someone :("\n"gaming chair still didnt fix my aim smh"\n"need someone to queue val with rn"\n"why am i so attached to pixel houses"\n"miss someone playing with my hair while i game"\n"4am ranked hits different when ur touch starved"\n"wondering if he thinks about our minecraft house"\n"pretty privilege doesn't work in bronze lobbies"\n"too insecure to use vc today sorry team"\n"manifestation era: bigger butt smaller rank"\n"only thing consistent is my daddy issues"\n"carrying trauma and bottom fragging"`,
        },
      ],
    });

    let tweet = completion.content[0].text;
    // Clean up AI formalities
    tweet = tweet.replace(/^["'](.+)["']$/, "$1");
    tweet = tweet.replace(
      /^(here'?s? )?(a tweet about |how |what if |when )?/i,
      ""
    );
    tweet = tweet.replace(/^i would tweet:|i would say:|tweet:/i, "");
    tweet = tweet.replace(/\.$/, ""); // Remove trailing periods
    return tweet.trim();
  } catch (error) {
    console.error("Error generating tweet with Claude:", error);
    throw error;
  }
}

// Send tweet function
async function sendTweet(tweet) {
  try {
    const response = await twitterClient.v2.tweet(tweet);
    console.log("Tweet sent successfully:", response);
    return response;
  } catch (error) {
    console.error("Error sending tweet:", error);
    throw error;
  }
}

// Main execution
async function main() {
  try {
    // Randomly select a prompt
    const promptIndex = Math.floor(Math.random() * prompts.length);
    const prompt = prompts[promptIndex];

    // Generate and send tweet
    const tweet = await generateTweet(prompt);
    console.log("Generated Tweet:", tweet);
    await sendTweet(tweet);
  } catch (error) {
    console.error("Error in main execution:", error);
    process.exit(1);
  }
}

main();
