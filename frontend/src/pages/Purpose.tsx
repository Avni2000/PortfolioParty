import Layout from "@/components/Layout";

const Purpose = () => {
  return (
    <Layout>
      <header className="pt-12 mb-7">
        <h1 className="text-4xl font-extrabold text-center text-hero-text">Our Purpose</h1>
        <p className="mt-4 text-center text-lg text-muted-foreground max-w-3xl mx-auto px-2">
          Why Portfolio Party exists—and who we’re here for.
        </p>
      </header>
      <div className="mb-4 mx-auto max-w-3xl">
            <img
              src="https://hycm.s3.amazonaws.com/public/files/articles/how_to_trade.webp"
              alt="image of a person trading"
              className="rounded-lg shadow-lg mx-auto md:mx-0 max-w-full"
            />
      </div>

      <section className="max-w-4xl mx-auto px-4 pb-10">
        <article className="space-y-6 text-base leading-relaxed text-muted-foreground">
          <p>
            We know investing can seem confusing, intimidating, and like it’s only for people who already have money.
            But we believe everyone deserves a shot at building wealth, no matter where they’re from.
          </p>

          <h2 className="text-xl font-semibold text-white">Making Investing Make Sense</h2>
          <p>
            We started Portfolio Party because we saw too many people from our communities getting left out of the financial conversation.
            Schools don’t teach it. Most apps don’t explain it. And unless you already know someone who’s investing, it’s hard to even know where to start.
          </p>
          <p>So we’re changing that.</p>
          <p>
            Our platform helps you learn by doing—and by seeing how other real people invest.
            You can explore different portfolios, understand what people are putting their money into,
            and start figuring out what makes sense for you.
          </p>

          <h2 className="text-xl font-semibold text-white">None of the Fancy Stuff</h2>
          <p>
            We keep things simple, honest, and clear. No confusing financial talk. No pressure to be a pro.
            Just all the tools and knowledge you need to get started—and a community that’s learning right along with you.
          </p>

          <h2 className="text-xl font-semibold text-white">Investing Shouldn’t Be a Secret</h2>
          <p>
            We’re here to break down barriers and help you do so too. If you’ve ever felt like investing wasn’t “for you,”
            we want to prove that it absolutely can be. You deserve to grow your money, build your future, and feel confident doing so.
          </p>
          <p>
            We’re in this together—and we’re just getting started.
          </p>
        </article>
      </section>
    </Layout>
  );
};

export default Purpose;
