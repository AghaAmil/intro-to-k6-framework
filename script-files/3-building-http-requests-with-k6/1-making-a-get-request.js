import http from "k6/http";

export default function () {
  const res = http.get("https://test-api.k6.io/public/crocodiles/");
  console.log(res);
}
