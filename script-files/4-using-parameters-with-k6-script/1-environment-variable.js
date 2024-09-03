import http from "k6/http";

export default function () {
  console.log(__ENV.BASE_URL);

  http.get(`${__ENV.BASE_URL}/public/crocodiles/`);
}
