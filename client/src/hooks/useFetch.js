import { useState } from "react";
import { useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const abortCont = new AbortController();
    setData(null);
    setIsPending(true);

    fetch(url, { signal: abortCont.signal })
      .then((resp) => {
        if (!resp.ok) {
          throw Error("Could not fetch the data");
        }
        return resp.json();
      })
      .then((receivedData) => {
        setData(receivedData);
        setIsPending(false);
        setError(null);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("fetch aborted");
        } else {
          setIsPending(false);
          setError(err.message);
        }
      });

    return () => abortCont.abort();
  }, [url]);

  return { data, isPending, error };
};

export default useFetch;