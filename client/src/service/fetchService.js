const fetchOptions = (body, method) => {
  const options = {
      method: method,
      headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + sessionStorage.getItem("AuthToken")
      }
  };

  if (method !== "GET" && body) {
      options.body = JSON.stringify(body);
  }

  return options;
};

const fetchOptionsNoJwt = (body, method) => {
  const options = {
      method: method,
      headers: {
          "Content-Type": "application/json",
      }
  };

  if (method !== "GET" && body) {
      options.body = JSON.stringify(body);
  }

  return options;
};

export const performRequestAdmin = async (url, method, body, page = 1, search = "") => {
  const searchParam = search ? `search=${encodeURIComponent(search)}&` : '';
  const pageParam = `page=${page}`;

  const apiUrl = `${url}${url.includes("?") ? "&" : "?"}${searchParam}${pageParam}`;
  

  const options = fetchOptions(body, method);

  try {
    const resp = await fetch(apiUrl, options);
    if (!resp.ok) {
      throw new Error(`HTTP error! Status: ${resp.status}`);
    }

    const data = await resp.json();
    return data;
  } catch (error) {
    console.error("Error in performRequestAdmin:", error);
    throw error;
  }
};
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



