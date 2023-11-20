const fetchOptions = (body, method) => ({
    method: method,
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + sessionStorage.getItem("AuthToken")
    }
});
const fetchOptionsNoJwt = (body, method) => ({
    method: method,
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    }
});

export const performRequestAdmin = async (url, method, body, page = 1, search = "") => { 
  const searchParam = search ? `&search=${encodeURIComponent(search)}` : "";
  const apiUrl = `${url}${url.includes("?") ? "&" : "?"}page=${page}${searchParam}`;
  console.log("API URL:", apiUrl);

  let options;
  if (sessionStorage.getItem("AuthToken")) {
      options = fetchOptions(body, method);
  } else {
      options = fetchOptionsNoJwt(body, method);
  }

  if (method === "GET") {
      delete options.body;
  } else {
      options.body = JSON.stringify(body);
  }

  try {
      const resp = await fetch(apiUrl, options);
      if (!resp.ok) {
          throw new Error(`HTTP error! Status: ${resp.status}`);
      }

      const data = await resp.json();
      return data;
  } catch (error) {
      console.error("Error in performRequest:", error);
      throw error;
  }
}
export const performRequest = async (url, method, body) => { 
    let options
    if(sessionStorage.getItem("AuthToken")) {
      options = fetchOptions(body, method);
    } else {
      options = fetchOptionsNoJwt(body, method);
    }
    let resp = await fetch(url, options);
    let data = await resp.json()
    return data;
}



