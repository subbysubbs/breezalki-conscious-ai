const handleSubmit = async () => {
  setLoading(true);
  const res = await fetch('/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt })
  });

  const data = await res.json();
  setOutput(data.message);
  setLoading(false);
};
