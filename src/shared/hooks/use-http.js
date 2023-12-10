import { useState, useCallback } from "react";

const useHttp = function () {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const clearError = function () {
    setError(null);
  };

  const sendHttpRequest = useCallback(async function (
    requestUrl,
    httpMethod = "GET",
    requestBody = null,
    requestHeaders = {}
  ) {
    try {
      setIsLoading(true);
      const response = await fetch(requestUrl, {
        method: httpMethod,
        body:
          requestBody &&
          (requestBody instanceof FormData
            ? requestBody
            : JSON.stringify(requestBody)),
        headers: requestHeaders,
      });
      const responseData = await response.json();
      if (!response.ok) throw responseData;
      setIsLoading(false);
      return responseData;
    } catch (err) {
      setIsLoading(false);
      setError(err);
      throw err;
    }
  },
  []);

  return [isLoading, error, sendHttpRequest, clearError];
};

export default useHttp;
