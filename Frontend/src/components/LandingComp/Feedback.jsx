import React, { useState, useEffect, useRef } from "react";

const Feedback = () => {
  const [showFeedback, setShowFeedback] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const scrollContainerRef = useRef(null);

  // Existing scroll detection effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      setShowFeedback(scrollPosition > windowHeight * 0.5);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto scroll effect
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || isHovering) return;

    const intervalId = setInterval(() => {
      if (
        container.scrollLeft >=
        container.scrollWidth - container.clientWidth
      ) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollBy({ left: 300, behavior: "smooth" });
      }
    }, 3000); // Scroll every 3 seconds

    return () => clearInterval(intervalId);
  }, [isHovering]);
  return (
    <div
      className={`transition-opacity  duration-500 ${
        showFeedback ? "opacity-100" : "opacity-50"
      }`}
    >
      <div className="container  px-12 py-10 top-4 relative bg-black bg-opacity-50 backdrop-blur-sm  shadow-lg border border-green-500">
        <h2 className="text-3xl font-bold text-center mb-8 text-white">
          What Our Users Say
        </h2>

        {/* Scrollable Container */}
          <div
            id="feedback-container"
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-6 pb-4 snap-x snap-mandatory scrollbar-hide"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {/* Feedback Card 1 */}
            <div className="flex-none w-80 snap-center">
              <div className="bg-black bg-opacity-50 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-green-500">
                <div className="flex items-center mb-4">
                  <img
                    src="https://i.pravatar.cc/60?img=1"
                    alt="User"
                    className="w-12 h-12 rounded-full border-2 border-green-500"
                  />
                  <div className="ml-4">
                    <h3 className="font-semibold text-white">John Doe</h3>
                    <p className="text-green-400">Startup Founder</p>
                  </div>
                </div>
                <p className="text-gray-200">
                  "This platform has been instrumental in helping me navigate
                  the startup ecosystem. The resources are invaluable!"
                </p>
              </div>
            </div>

            {/* Feedback Card 2 */}
            <div className="flex-none w-80 snap-center">
              <div className="bg-black bg-opacity-50 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-green-500">
                <div className="flex items-center mb-4">
                  <img
                    src="https://i.pravatar.cc/60?img=2"
                    alt="User"
                    className="w-12 h-12 rounded-full border-2 border-green-500"
                  />
                  <div className="ml-4">
                    <h3 className="font-semibold text-white">Jane Smith</h3>
                    <p className="text-green-400">Tech Entrepreneur</p>
                  </div>
                </div>
                <p className="text-gray-200">
                  "The community here is amazing! I've found mentors and
                  partners who have helped me grow my business."
                </p>
              </div>
            </div>

            {/* Feedback Card 3 */}
            <div className="flex-none w-80 snap-center">
              <div className="bg-black bg-opacity-50 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-green-500">
                <div className="flex items-center mb-4">
                  <img
                    src="https://i.pravatar.cc/60?img=3"
                    alt="User"
                    className="w-12 h-12 rounded-full border-2 border-green-500"
                  />
                  <div className="ml-4">
                    <h3 className="font-semibold text-white">Mike Johnson</h3>
                    <p className="text-green-400">Angel Investor</p>
                  </div>
                </div>
                <p className="text-gray-200">
                  "As an investor, I've found some of the most promising
                  startups through this platform. It's a game-changer!"
                </p>
              </div>
            </div>

            {/* Additional cards... */}
            <div className="flex-none w-80 snap-center">
              <div className="bg-black bg-opacity-50 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-green-500">
                <div className="flex items-center mb-4">
                  <img
                    src="https://i.pravatar.cc/60?img=4"
                    alt="User"
                    className="w-12 h-12 rounded-full border-2 border-green-500"
                  />
                  <div className="ml-4">
                    <h3 className="font-semibold text-white">Sarah Williams</h3>
                    <p className="text-green-400">Product Manager</p>
                  </div>
                </div>
                <p className="text-gray-200">
                  "The insights and connections I've gained here have been
                  crucial to our product's success."
                </p>
              </div>
            </div>

            <div className="flex-none w-80 snap-center">
              <div className="bg-black bg-opacity-50 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-green-500">
                <div className="flex items-center mb-4">
                  <img
                    src="https://i.pravatar.cc/60?img=5"
                    alt="User"
                    className="w-12 h-12 rounded-full border-2 border-green-500"
                  />
                  <div className="ml-4">
                    <h3 className="font-semibold text-white">Alex Chen</h3>
                    <p className="text-green-400">Software Engineer</p>
                  </div>
                </div>
                <p className="text-gray-200">
                  "The technical resources and startup guides here are
                  top-notch. Really helped in building our MVP!"
                </p>
              </div>
            </div>

            <div className="flex-none w-80 snap-center">
              <div className="bg-black bg-opacity-50 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-green-500">
                <div className="flex items-center mb-4">
                  <img
                    src="https://i.pravatar.cc/60?img=6"
                    alt="User"
                    className="w-12 h-12 rounded-full border-2 border-green-500"
                  />
                  <div className="ml-4">
                    <h3 className="font-semibold text-white">Emma Watson</h3>
                    <p className="text-green-400">Marketing Director</p>
                  </div>
                </div>
                <p className="text-gray-200">
                  "Found amazing growth strategies through the community. Our
                  startup saw 300% growth!"
                </p>
              </div>
            </div>

            <div className="flex-none w-80 snap-center">
              <div className="bg-black bg-opacity-50 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-green-500">
                <div className="flex items-center mb-4">
                  <img
                    src="https://i.pravatar.cc/60?img=7"
                    alt="User"
                    className="w-12 h-12 rounded-full border-2 border-green-500"
                  />
                  <div className="ml-4">
                    <h3 className="font-semibold text-white">David Kim</h3>
                    <p className="text-green-400">VC Partner</p>
                  </div>
                </div>
                <p className="text-gray-200">
                  "The quality of startups here is impressive. We've funded
                  three companies we found through this platform."
                </p>
              </div>
            </div>

            <div className="flex-none w-80 snap-center">
              <div className="bg-black bg-opacity-50 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-green-500">
                <div className="flex items-center mb-4">
                  <img
                    src="https://i.pravatar.cc/60?img=8"
                    alt="User"
                    className="w-12 h-12 rounded-full border-2 border-green-500"
                  />
                  <div className="ml-4">
                    <h3 className="font-semibold text-white">
                      Sophie Martinez
                    </h3>
                    <p className="text-green-400">UX Designer</p>
                  </div>
                </div>
                <p className="text-gray-200">
                  "The design resources and feedback from fellow designers have
                  been invaluable for our product development."
                </p>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
};

export default Feedback;
