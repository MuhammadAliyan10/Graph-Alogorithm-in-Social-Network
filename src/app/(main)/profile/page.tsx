"use client";
import React, { useEffect, useState } from "react";

const FacebookDataFetcher: React.FC = () => {
  const [authToken, setAuthToken] = useState("");
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    console.log(authToken);

    const fetchFacebookData = async (authToken: string | null) => {
      try {
        const response = await fetch("/api/auth/facebook/getGraphData", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ authToken }),
        });

        const result = await response.json();

        if (response.ok) {
          setData(result.data);
          setError(null);
        } else {
          setError(result.error);
        }
      } catch (err) {
        console.error(err);
        setError("An unexpected error occurred");
      }
    };
    fetchFacebookData(authToken);
  }, []);

  return (
    <div>
      <h1>Facebook Data Fetcher</h1>

      {error && <p className="text-red-500 mt-4">Error: {error}</p>}
      {data && (
        <div className="mt-4">
          <h2>User Data:</h2>
          <pre className="bg-gray-100 p-4 rounded">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default FacebookDataFetcher;
