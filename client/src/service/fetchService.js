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
