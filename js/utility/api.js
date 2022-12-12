async function api(end_url, method, payload) {
    const response = await fetch("https://lively-pond-0744c3603.2.azurestaticapps.net/" + end_url, {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      method: method,
      body: JSON.stringify(payload),
    });

    return await response.json();
  }