import React from 'react';
import { BrainCog, MessageSquare, Mic, Video } from 'lucide-react';
import TextToText from './components/TextToText';
import AudioToText from './components/AudioToText';
import VideoToText from './components/VideoToText';

type Demo = {
  id: string;
  name: string;
  icon: React.ReactNode;
  component: React.ComponentType;
};

function App() {
  const [activeDemo, setActiveDemo] = React.useState<string>('text');

  const demos: Demo[] = [
    { id: 'text', name: 'Text to Text', icon: <MessageSquare className="h-5 w-5" />, component: TextToText },
    { id: 'audio', name: 'Audio to Text', icon: <Mic className="h-5 w-5" />, component: AudioToText },
    { id: 'video', name: 'Video to Text', icon: <Video className="h-5 w-5" />, component: VideoToText },
  ];

  const ActiveComponent = demos.find(demo => demo.id === activeDemo)?.component || TextToText;

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <nav className="border-b border-gray-800 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <BrainCog className="h-8 w-8 text-purple-500" />
              <span className="ml-2 text-xl font-semibold">Gemini Explorer</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-64 space-y-4">
            <h2 className="text-lg font-semibold text-gray-200">Demos</h2>
            <nav className="space-y-1">
              {demos.map((demo) => (
                <button
                  key={demo.id}
                  onClick={() => setActiveDemo(demo.id)}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    activeDemo === demo.id
                      ? 'bg-purple-600 text-white'
                      : 'text-gray-300 hover:bg-gray-800'
                  }`}
                >
                  {demo.icon}
                  <span className="ml-3">{demo.name}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="flex-1">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-100">
                {demos.find(demo => demo.id === activeDemo)?.name}
              </h1>
              <p className="mt-2 text-gray-400">
                Experience the power of Gemini's {activeDemo} capabilities.
              </p>
            </div>

            <ActiveComponent />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
