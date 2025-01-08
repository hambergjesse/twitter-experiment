require("dotenv").config();

module.exports = {
  twitterApiKey: process.env.TWITTER_API_KEY,
  twitterApiSecret: process.env.TWITTER_API_SECRET,
  twitterAccessToken: process.env.TWITTER_ACCESS_TOKEN,
  twitterAccessSecret: process.env.TWITTER_ACCESS_SECRET,
  openaiApiKey: process.env.OPENAI_API_KEY,
};
