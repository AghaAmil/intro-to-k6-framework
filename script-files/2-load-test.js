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
    // Ramp-up stage
    { duration: "10s", target: 10 }, // Ramp up to 10 users over 5 minutes
    // Steady state stage
    { duration: "30s", target: 10 }, // Stay at 10 users for 30 minutes
    // Ramp-down stage
    { duration: "10s", target: 0 }, // Ramp down to 0 users over 5 minutes
  ],
};

export default function () {
  http.get("https://test.k6.io");
  sleep(1);
  http.get("https://test.k6.io/contacts.php");
  sleep(1);
  http.get("https://test.k6.io/news.php");
  sleep(1);
}
