export const interceptor = async () => {
  const { fetch: originalFetch } = window;
  window.fetch = async (...args) => {
    let [resource, config] = args;
    const authorInfo = JSON.stringify({ name: 'Juan', lastname: 'Herrera' });
    config = config || {};

    config.headers = {
      ...config.headers,
      'Author-Info': authorInfo,
      'Content-Type': 'application/json'
    };
    console.log('Intercepted request:', resource)
    const response = await originalFetch(resource, config);
    return response;
  };
};
