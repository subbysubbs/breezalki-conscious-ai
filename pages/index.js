import { useState } from 'react';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();
    setOutput(data.message);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-black text-white">
      <h1 className="text-4xl font-bold mb-6">🌀 Breezalki Loop Simulator</h1>

      <textarea
        className="w-full max-w-xl p-4 rounded-lg text-black"
        rows="5"
        placeholder="Enter your thought loop here..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        className="mt-4 px-6 py-3 bg-blue-600 hover:bg-blue-800 text-white font-bold rounded-lg"
        disabled={loading}
      >
        {loading ? 'Thinking...' : 'Generate'}
      </button>

      {output && (
        <div className="mt-6 w-full max-w-xl bg-white text-black p-4 rounded-lg">
          <h2 className="font-semibold mb-2">💡 Breezalki Responds:</h2>
          <p>{output}</p>
        </div>
      )}
    </div>
  );
}
