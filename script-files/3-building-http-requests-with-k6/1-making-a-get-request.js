import http from "k6/http";

export default function () {
  const res = http.get("https://test-api.k6.io/public/crocodiles/");
  console.log(res);
}

// read document (5-debugging-http-requests-and-response-in-k6) and redo the script