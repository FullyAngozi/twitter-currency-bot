import { TwitterApi } from "twitter-api-v2";
import dotenv from "dotenv";
dotenv.config();

const twitterClient = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET_KEY,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

async function tweetRates(rates) {
  const tweet = `Current exchange rates:\n1 USD: ₦${rates.usdRates}\n1 EUR: ₦${rates.euroRates}\n1 CAD: ₦${rates.cadRates}\n1 GBP: ₦${rates.poundRates}`;
  try {
    await twitterClient.v2.tweet(tweet);
    console.log("Tweet sent:", tweet);
  } catch (error) {
    console.error("Error sending tweet:", error.message);
  }
}

export default tweetRates;
