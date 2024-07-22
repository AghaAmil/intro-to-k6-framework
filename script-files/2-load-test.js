import http from "k6/http";
import { sleep } from "k6";

// setting a configuration for a load test
export const options = {
  stages: [
    /* 

    below can be referred as actual values to put a load test for an application
    { duration: "5m", target: 1000 },
    { duration: "30m", target: 1000},
    { duration: "5m", target: 0 },


    */
    { duration: "10s", target: 10 }, // target: the number target vus
    { duration: "30s", target: 10 },
    { duration: "10s", target: 0 },
  ],
};

export default function () {
  http.get("https://test.k6.io");
  sleep(1);
  http.get("https://test.k6.io/contacts.php");
  sleep(2);
  http.get("https://test.k6.io/news.php");
  sleep(2);
}
