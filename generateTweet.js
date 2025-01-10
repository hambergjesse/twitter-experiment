import dotenv from "dotenv";
import { TwitterApi } from "twitter-api-v2";
import Anthropic from "@anthropic-ai/sdk";

dotenv.config();

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
async function generateTweet() {
  try {
    const completion = await anthropic.messages.create({
      model: "claude-3-sonnet-20240229",
      max_tokens: 150,
      temperature: 0.9,
      messages: [
        {
          role: "user",
          content: `Generate a generic e-girl tweet (can be a random thought and or a question).

Rules for the tweet:
- Can be different length (25-60 chars)
- Can include a question or a thought 
- Make unique/unhinged
- Sound impulsive
- Keep it relatable
- No caps or grammar
- Can use :> <3 x </3 :3
- Keep flirty/sad tone
- Can be absolutely absurd
- Do not censor but avoid hate speech

Here are some examples, use for INSPIRATION ONLY, DO NOT COPY:
          
shorter (25-35 chars):
"therapy is my new hobby x"
"touch starved era continues"
"why am i still hardstuck fr"
"need someone to ruin me rn"
"bottom frag but make it cute"

medium (35-45 chars):
"cant sleep so im throwing ranked games <3"
"my duo left me for someone who can aim"
"anyone else hear voices in empty discord"
"down bad for somebody's shot calls fr"
"queueing through the mental breakdown"

longer (45-60 chars):
"trying to gaslight myself into thinking im not hardstuck"
"my love language is getting carried through ranked"
"holding site but cant hold a relationship :3"
"what if we practiced lineups together haha jk unless"
"someone teach me lineups ill pay in attention"

stream of consciousness:
"why do i only fall for people who main duelists"
"need new duo but r u mentally unstable enough"
"cant decide if im throwing or just distracted by u"
"trying to find the person who lives in my walls"

Only return the tweet, DO NOT INCLUDE ANY META TEXT.`,
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
    // Generate and send tweet
    const tweet = await generateTweet();
    console.log("Generated Tweet:", tweet);
    await sendTweet(tweet);
  } catch (error) {
    console.error("Error in main execution:", error);
    process.exit(1);
  }
}

main();
