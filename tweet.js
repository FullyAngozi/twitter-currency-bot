import { TwitterApi } from "twitter-api-v2";
import dotenv from "dotenv";
dotenv.config({
  path: "/Users/fullyangozi/Web Development projects/twitter-naira-bot/.env",
});

const twitterClient = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET_KEY,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

async function tweetRates(rates) {
  const tweet = `📊 Today's Naira Exchange Rates 🇳🇬

💵 $1 USD = ₦${rates.usdRates}
💶 €1 EUR = ₦${rates.euroRates}
🍁 $1 CAD = ₦${rates.cadRates}
💷 £1 GBP = ₦${rates.poundRates}

💡 What's your take on these rates?

#NairaExchange #ForexUpdate #NigerianEconomy #USD #EUR #CAD #GBP

Follow for daily updates! 🔔`;
  try {
    await twitterClient.v2.tweet(tweet);
    console.log("Tweet sent:", tweet);
  } catch (error) {
    console.error("Error sending tweet:", error.message);
  }
}

export default tweetRates;
