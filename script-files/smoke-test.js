import http from "k6/http";
import { sleep } from "k6";

// setting a configuration for load test
export const options = {
  vus: 1, // number of virtual users
  duration: "30s", // load test duration
};

export default function () {
  http.get("https://test.k6.io");
  sleep(1); // pauses for 1 second
  http.get("<https://test.k6.io/contacts.php>");
  sleep(2);
  http.get("<https://test.k6.io/news.php>");
  sleep(2);
}
