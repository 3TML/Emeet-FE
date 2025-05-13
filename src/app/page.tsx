"use client";
import { useEffect, useState } from "react";

const TestAPIPage = () => {
  const [result, setResult] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://emeet.gahonghac.net/api/v1/auth/TestAPI"
        );
        if (!res.ok) throw new Error("API error: " + res.status);
        const data = await res.json();
        console.log(data);
        setResult(data);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2">Test API Result</h1>
      <pre className="bg-gray-100 p-2 rounded">
        {JSON.stringify(result, null, 2)}
      </pre>
    </div>
  );
};

export default TestAPIPage;
