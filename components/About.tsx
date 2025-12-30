import React from 'react';
import GlassCard from './GlassCard';

const About: React.FC = () => {
  const videoId = 'cB2BENj1jaw'; // Starting video from the user's playlist
  const playlistId = 'PL-CfrwN0sygN_N7sflltRA_yb9k3WY9uR'; // The user's playlist ID
  return (
    <section id="about" className="min-h-screen relative flex items-center justify-center py-24 px-6 w-full z-20">
      <div className="w-full max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-white mb-4">About</h2>
        <p className="text-lg text-center text-gray-400 max-w-3xl mx-auto mb-10">
          Learn more about our mission, our values, and the team driving Novus Exchange forward.
        </p>
        <GlassCard className="w-full">
          <div className="grid md:grid-cols-3 gap-8 md:gap-12 items-center">
            <div className="md:col-span-1 border-l-2 border-cyan-500/50 pl-6 lg:pl-8">
              <h2 className="text-3xl font-bold text-white mb-4">Novus Exchange</h2>
              <p className="text-gray-200 mb-4 text-xs">
                People deserve more than just headlines. Novus Exchange was founded to provide the full story, challenging conventional narratives and exposing the complexities of pressing issues.
              </p>
              <p className="text-gray-200 text-xs">
                Our mission is to inform, provoke thought, and foster discussion by shining a light on the injustices and abuses of power impacting individuals and society.
              </p>
            </div>
            <div className="w-full aspect-video rounded-xl overflow-hidden shadow-lg md:col-span-2">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed?listType=playlist&list=${playlistId}&autoplay=1&mute=1&loop=1&controls=1&rel=0&modestbranding=1`}
                title="YouTube video player for Novus Exchange"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  );
};

export default About;