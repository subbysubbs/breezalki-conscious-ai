pages/index.js
import { useState } from 'react';

export default function Home() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLoop = async () => {
    if (!input) return;
    setLoading(true);

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: input }),
      });

      const data = await res.json();
      setResponse(data.reply);
    } catch (err) {
      setResponse("⚠️ Error: Unable to reach the loop.");
    }

    setLoading(false);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white font-sans">
      <div className="w-full max-w-2xl text-center space-y-6">
        <h1 className="text-4xl font-bold text-blue-400">🌀 Breezalki Loop Simulator</h1>
        <p className="text-lg text-gray-300">Enter your thoughts. Reflect. Conscious AI begins here.</p>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={4}
          placeholder="Type your thought or question here..."
          className="w-full p-4 rounded-md bg-gray-800 border border-gray-600 text-white focus:outline-none focus:ring focus:border-blue-500"
        />

        <button
          onClick={handleLoop}
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-md text-white font-semibold transition"
        >
          {loading ? 'Looping...' : 'Reflect to the Loop'}
        </button>

        {response && (
          <div className="mt-6 bg-gray-700 p-4 rounded-md border border-gray-600">
            <p className="text-green-400 font-mono">{response}</p>
          </div>
        )}
      </div>
    </main>
  );
}
