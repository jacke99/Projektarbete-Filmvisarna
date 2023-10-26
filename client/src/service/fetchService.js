const fetchOptions = (body, method) => ({
    method: method,
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + sessionStorage.getItem("AuthToken")
    }
});

export const performRequest = async (url, method, body) => { 
    const options = fetchOptions(body, method);
    let resp = await fetch(url, options);
    let data = await resp.json()
    return data;
}
