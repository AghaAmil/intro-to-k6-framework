import http from "k6/http";
import { check, sleep } from "k6";
import { Counter, Trend } from "k6/metrics";

export const options = {
  vus: 10,
  duration: "10s",
  thresholds: {
    http_req_duration: ["p(95) < 300"], // p(95) should be less than 300 milliseconds
    my_counter: ["count > 10"], // the number of counter (request) should be grater than 10

    // p(95) of response time should be less than 150 milliseconds
    // p(99) of response time should be less than 200 milliseconds
    response_time_news_page: ["p(95) < 150", "p(99) < 200"],
  },
};

let myCounter = new Counter("my_counter");
// define a new metric to measure the response time
let newsPageResponseTrend = new Trend("response_time_news_page");

export default function () {
  let res = http.get("https://test.k6.io");
  myCounter.add(1);
  sleep(2);

  res = http.get("https://test.k6.io/news.php");
  newsPageResponseTrend.add(res.timings.duration);
  sleep(1);
}
