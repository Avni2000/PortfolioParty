import Layout from "@/components/Layout";

const Support = () => {
  return (
    <Layout>
      <header className="pt-12 mb-12">
        <h1 className="text-4xl font-extrabold text-center text-hero-text">Support</h1>
        <p className="mt-4 text-center text-lg text-muted-foreground max-w-3xl mx-auto px-4">
          We're here to help you navigate your journey. Whether you're new to Portfolio Party or a long-time user, explore the resources below or reach out directly.
        </p>
      </header>

      <section className="max-w-5xl mx-auto space-y-16 px-4 pb-20">
        {/* Section 1: FAQs */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-4">📚 Frequently Asked Questions</h2>
          <p className="text-muted-foreground mb-4">
            Get quick answers to common questions about accounts, billing, trading tools, and platform features.
          </p>
          <ul className="list-disc list-inside text-sm space-y-2 text-foreground">
            <li>How do I reset my password?</li>
            <li>Where can I view my transaction history?</li>
            <li>What strategies do you recommend for beginners?</li>
            <li>How do I update my profile information?</li>
          </ul>
        </div>

        {/* Section 2: Contact Us */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-4">📬 Contact Us</h2>
          <p className="text-muted-foreground mb-2">
            Still need help? Our support team is ready to assist you Monday through Friday, 9am – 6pm EST.
          </p>
          <ul className="text-sm text-foreground space-y-1">
            <li>Email: <a href="mailto:support@portfolioparty.com" className="underline hover:text-primary">support@portfolioparty.com</a></li>
            <li>Phone: (123) 456-7890</li>
            <li>Live Chat: Available in the bottom right corner</li>
          </ul>
        </div>

        {/* Section 3: Tutorials & Guides */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-4">🎥 Tutorials & Guides</h2>
          <p className="text-muted-foreground mb-4">
            Learn how to use our platform effectively with step-by-step tutorials.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-border rounded-lg p-4 bg-muted">
              <h3 className="font-semibold text-lg">Getting Started</h3>
              <p className="text-sm text-muted-foreground">Create an account, explore the dashboard, and set up your portfolio.</p>
            </div>

            <div className="border border-border rounded-lg p-4 bg-muted">
              <h3 className="font-semibold text-lg">Mastering Trading Tools</h3>
              <p className="text-sm text-muted-foreground">Learn to analyze charts, use indicators, and manage your trades.</p>
            </div>
          </div>
        </div>

        {/* Section 4: Community */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-4">💬 Join the Community</h2>
          <p className="text-muted-foreground mb-2">
            Connect with other investors, ask questions, and share strategies on our forum and Discord.
          </p>
          <ul className="text-sm text-foreground space-y-1">
            <li>Forum: <a href="https://google.com" className="underline hover:text-primary">community.portfolioparty.com</a></li>
            <li>Discord: <a href="https://discord.gg/" className="underline hover:text-primary">Join our Discord</a></li>
          </ul>
        </div>
      </section>
    </Layout>
  );
};

export default Support;