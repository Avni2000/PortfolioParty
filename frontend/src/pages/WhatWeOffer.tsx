import Layout from "@/components/Layout";
import { ChartBarIcon, UsersIcon, BellAlertIcon, TrophyIcon, SparklesIcon } from "@heroicons/react/24/outline";

const WhatWeOffer = () => {
  return (
    <Layout>
      <header className="pt-12 mb-12">
        <h1 className="text-4xl font-extrabold text-center text-hero-text">What We Offer</h1>
        <p className="mt-4 text-center text-lg text-muted-foreground max-w-3xl mx-auto px-4">
          Unlock your investing potential with our all-in-one social investing platform.
        </p>
        </header>

      <section className="max-w-5xl mx-auto space-y-16 px-4 pb-12">

        {/* Community & Collaboration */}
        <div className="flex flex-col md:flex-row items-center gap-8">
          <UsersIcon className="w-16 h-16 text-primary mx-auto md:mx-0" />
          <div className="md:flex-1 text-center md:text-left">
            <h2 className="text-2xl font-semibold mb-3">Community & Collaboration</h2>
            <p className="text-muted-foreground">
              Join a vibrant network of traders and investors. Share ideas, discuss strategies, and learn from real-time market insights with peers who are as passionate as you are.
            </p>
          </div>
          {/* Image placeholder */}
          <div className="md:flex-1">
            <img
              src="https://www.shutterstock.com/image-photo/teamwork-partnership-concept-hands-raised-600nw-2465435951.jpg"
              alt="Community discussing stocks"
              className="rounded-lg shadow-lg mx-auto md:mx-0 max-w-full"
            />
          </div>
        </div>

        <hr className="border-border" />

        {/* Powerful Tools */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-8">
          <ChartBarIcon className="w-16 h-16 text-primary mx-auto md:mx-0" />
          <div className="md:flex-1 text-center md:text-left">
            <h2 className="text-2xl font-semibold mb-3">Powerful Trading Tools</h2>
            <p className="text-muted-foreground">
              Use intuitive analytics dashboards, personalized alerts, and educational resources tailored to keep you informed and confident, no matter your experience level.
            </p>
          </div>
          {/* Image placeholder */}
          <div className="md:flex-1">
            <img
              src="https://www.bankrate.com/brp/2023/10/16124824/Investments-Stock-market-basics_9-tips-for-beginners.jpg?auto=webp&optimize=high&crop=16:9"
              alt="Trading tools dashboard"
              className="rounded-lg shadow-lg mx-auto md:mx-0 max-w-full"
            />
          </div>
        </div>

        <hr className="border-border" />

        {/* Smart Trading */}
        <div className="flex flex-col md:flex-row items-center gap-8">
          <BellAlertIcon className="w-16 h-16 text-primary mx-auto md:mx-0" />
          <div className="md:flex-1 text-center md:text-left">
            <h2 className="text-2xl font-semibold mb-3">Smart Trading Made Simple</h2>
            <p className="text-muted-foreground">
              Discover expert-backed strategies and get instant notifications on stock movements, social sentiment, and trending opportunities customized to your goals.
            </p>
          </div>
          {/* Image placeholder */}
          <div className="md:flex-1">
            <img
              src="https://sinch.com/wp-content/uploads/2024/08/Sinch-Blog-What-is-a-push-notification_1400x830-1.png"
              alt="Smart trading notifications"
              className="rounded-lg shadow-lg mx-auto md:mx-0 max-w-full"
            />
          </div>
        </div>

        <hr className="border-border" />

        {/* Social Investing & Gamification */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-8">
          <TrophyIcon className="w-16 h-16 text-primary mx-auto md:mx-0" />
          <div className="md:flex-1 text-center md:text-left">
            <h2 className="text-2xl font-semibold mb-3">Social Investing & Gamification</h2>
            <p className="text-muted-foreground">
              Follow top traders, join themed groups, and participate in friendly challenges. Earn badges, unlock rewards, and make investing fun and rewarding.
            </p>
          </div>
          {/* Image placeholder */}
          <div className="md:flex-1">
            <img
              src="https://miro.medium.com/v2/resize:fit:4000/1*SXSjL_GGy6OSnFttwGmrAw.jpeg"
              alt="Social investing and gamification"
              className="rounded-lg shadow-lg mx-auto md:mx-0 max-w-full"
            />
          </div>
        </div>

        <hr className="border-border" />

        {/* Personalized Insights */}
        <div className="flex flex-col md:flex-row items-center gap-8">
          <SparklesIcon className="w-16 h-16 text-primary mx-auto md:mx-0" />
          <div className="md:flex-1 text-center md:text-left">
            <h2 className="text-2xl font-semibold mb-3">Personalized Insights</h2>
            <p className="text-muted-foreground">
              Receive daily news highlights, portfolio health checks, and tailored recommendations based on your interests and risk tolerance. Your financial journey, customized for you.
            </p>
          </div>
          {/* Image placeholder */}
          <div className="md:flex-1">
            <img
              src="https://cdn.prod.website-files.com/60d9f4be3e63714ea7b2592c/62fb3ea646a0f321db18d4ec_Main%20Blog%20%26%20Thumbnail%20(16).png"
              alt="Personalized financial insights"
              className="rounded-lg shadow-lg mx-auto md:mx-0 max-w-full"
            />
          </div>
        </div>

      </section>
    </Layout>
  );
};

export default WhatWeOffer;