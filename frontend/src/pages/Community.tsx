import Layout from "@/components/Layout";
import Chat from "@/img/chatScreenshot.png";

const Community = () => {
  return (
    <Layout>
      <header className="pt-12 mb-12">
        <h1 className="text-4xl font-extrabold text-center text-hero-text">Community</h1>
        <p className="mt-4 text-center text-lg text-muted-foreground max-w-3xl mx-auto px-4">
          Connect, learn, and grow with fellow users. Join discussions, share tips, and build your network.
        </p>
      </header>

      <section className="max-w-6xl mx-auto px-4 pb-20 space-y-8 text-white">
        {/* Forum Section */}
        <div className="bg-muted p-6 rounded-2xl shadow">
          <h2 className="text-2xl font-bold mb-2">💬 Community Forum and Chat</h2>
          <div className="mb-4 pt-5">
            <img
              src={Chat}
              alt="Example of interactive chat"
              className="rounded-lg shadow-lg mx-auto md:mx-0 max-w-full"
            />
          </div>
          <p className="mb-4 pt-3">
            Ask questions, share insights, and help others. Explore trending topics or start a new discussion.
          </p>
          <button className="bg-black text-white px-4 py-2 rounded-xl hover:bg-primary/80">
            Visit Forum
          </button>
        </div>

        {/* Events Section */}
        <div className="bg-muted p-6 rounded-2xl shadow">
          <h2 className="text-2xl font-bold mb-2">📅 Live Events & Webinars</h2>
          <div className="mb-4 pt-5">
            <img
              src="https://www.calendarlabs.com/wallpaper/monthly-wallpaper/08-2025/august-2025-wallpaper-calendar-blue-theme-1920x1080.jpg"
              alt="Image of Calender"
              className="rounded-lg shadow-lg mx-auto md:mx-0 max-w-full"
            />
          </div>
          <p className="mb-4">
            Join upcoming workshops, webinars, and AMA sessions with experts and fellow users.
          </p>
          <ul className="list-disc list-inside text-sm space-y-1">
            <li><strong>Aug 12:</strong> Building Your First Trading Strategy</li>
            <li><strong>Aug 19:</strong> Community Q&A with Product Team</li>
            <li><strong>Aug 24:</strong> Using AI Tools for Market Insights</li>
          </ul>
          <button className="mt-4 bg-black text-white px-4 py-2 rounded-xl hover:bg-primary/80">
            View Full Calendar
          </button>
        </div>

        {/* Social Section */}
        <div className="bg-muted p-6 rounded-2xl shadow">
          <h2 className="text-2xl font-bold mb-2 text-white">📱 Follow Us</h2>
          <p className="mb-4 text-white">
            Stay connected through social media and our Discord server.
          </p>
          <div className="flex space-x-6 items-center">
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 hover:underline"
            >
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/X_icon.svg/1200px-X_icon.svg.png" alt="X" className="w-6 h-6" />
              <span className="text-white">X</span>
            </a>

            <a
              href="https://discord.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 hover:underline"
            >
              <img src="https://cdn-icons-png.flaticon.com/512/3670/3670157.png" alt="Discord" className="w-6 h-6" />
              <span className="text-white">Discord</span>
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 hover:underline"
            >
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/LinkedIn_icon.svg/2048px-LinkedIn_icon.svg.png" alt="LinkedIn" className="w-6 h-6" />
              <span className="text-white">LinkedIn</span>
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Community;
