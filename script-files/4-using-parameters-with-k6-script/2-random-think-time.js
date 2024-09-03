import http from "k6/http";
import { sleep } from "k6";
import { randomIntBetween } from "https://jslib.k6.io/k6-utils/1.2.0/index.js";

export const options = {
  vus: 5,
  duration: "20s",
};

export default function () {
  http.get("https://test-api.k6.io/public/crocodiles/");

  console.log("__ VU Stage __");
  sleep(randomIntBetween(1, 5)); // sleep between 1 & 5 seconds
}
