import React, { useState } from 'react';
import { Upload, Loader2, Video } from 'lucide-react';

export default function VideoToText() {
  const [file, setFile] = useState<File | null>(null);
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setIsLoading(true);
    // TODO: Implement Gemini API call here
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated delay
    setResponse("This is a simulated analysis from Gemini API. The actual integration will be implemented when you add your API key.");
    setIsLoading(false);
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-xl p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Upload Video File
          </label>
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-600 border-dashed rounded-lg cursor-pointer bg-gray-700 hover:bg-gray-600 transition-colors">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                {file ? (
                  <>
                    <Video className="w-12 h-12 mb-3 text-purple-500" />
                    <p className="text-sm text-gray-400">{file.name}</p>
                  </>
                ) : (
                  <>
                    <Upload className="w-12 h-12 mb-3 text-gray-400" />
                    <p className="mb-2 text-sm text-gray-400">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">MP4, MOV, or WebM (MAX. 20MB)</p>
                  </>
                )}
              </div>
              <input
                type="file"
                className="hidden"
                accept="video/*"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
            </label>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading || !file}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                Processing...
              </>
            ) : (
              <>
                <Video className="-ml-1 mr-2 h-4 w-4" />
                Analyze
              </>
            )}
          </button>
        </div>
      </form>

      {response && (
        <div className="mt-6">
          <h2 className="text-lg font-medium text-gray-200 mb-2">Analysis</h2>
          <div className="bg-gray-700 rounded-lg p-4">
            <p className="text-gray-200 whitespace-pre-wrap">{response}</p>
          </div>
        </div>
      )}
    </div>
  );
}