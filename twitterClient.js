const { TwitterApi } = require("twitter-api-v2");
const {
  twitterApiKey,
  twitterApiSecret,
  twitterAccessToken,
  twitterAccessSecret,
} = require("./config");

const client = new TwitterApi({
  appKey: twitterApiKey,
  appSecret: twitterApiSecret,
  accessToken: twitterAccessToken,
  accessSecret: twitterAccessSecret,
});

module.exports = client.readWrite;
