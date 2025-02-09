import React, { useState } from "react";
import { Send, Loader2 } from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function TextToText() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Initialize the Gemini API with your API key
    const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

    if (!prompt.trim()) return;

    try {
      // Get the generative model
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      // Generate the story
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      setResponse(text);
    } catch (error) {
      console.error("Error generating content:", error);
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-xl p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="prompt"
            className="block text-sm font-medium text-gray-300"
          >
            Your Prompt
          </label>
          <div className="mt-1">
            <textarea
              id="prompt"
              rows={4}
              className="w-full p-2 rounded-lg bg-gray-700 border-2 border-gray-700 text-gray-100 placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500"
              placeholder="Enter your prompt here..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading || !prompt.trim()}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                Processing...
              </>
            ) : (
              <>
                <Send className="-ml-1 mr-2 h-4 w-4" />
                Generate
              </>
            )}
          </button>
        </div>
      </form>

      {response && (
        <div className="mt-6">
          <h2 className="text-lg font-medium text-gray-200 mb-2">Response</h2>
          <div className="bg-gray-700 rounded-lg p-4">
            <p className="text-gray-200 whitespace-pre-wrap">{response}</p>
          </div>
        </div>
      )}
    </div>
  );
}
