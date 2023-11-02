import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();

    (async () => {
      setData(null);
      setIsPending(true);

      try {
        const response = await fetch(url, { signal: abortCont.signal });

        if (!response.ok) {
          throw Error("Could not fetch the data");
        }

        const receivedData = await response.json();

        setData(receivedData);
        setIsPending(false);
        setError(null);
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("fetch aborted");
        } else {
          setIsPending(false);
          setError(err.message);
        }
      }
    })();

    return () => abortCont.abort();
  }, [url]);

  return { data, isPending, error };
};

export default useFetch;