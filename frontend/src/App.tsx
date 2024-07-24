import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
        <h1 className="mb-4 text-3xl font-bold">Vite + React</h1>
        <div className="rounded-lg bg-white p-8 shadow-lg">
          <button
            onClick={() => setCount((count) => count + 1)}
            className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          >
            count is {count}
          </button>
          <p className="mt-4">
            Edit <code className="font-mono">src/App.tsx</code> and save to test
            HMR
          </p>
        </div>
      </div>
    </>
  );
}

export default App;
