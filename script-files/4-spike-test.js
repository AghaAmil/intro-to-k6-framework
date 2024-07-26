import http from "k6/http";
import { sleep } from "k6";

// setting a configuration for a load test
export const options = {
  stages: [
    // fast ramp-up to a high point
    { duration: "2m", target: 10000 }, // Ramp up to 10000 users over 2 minutes
    // quick ramp-down to 0 users
    { duration: "1m", target: 0 }, // Ramp down to 0 users over 1 minute
  ],
};

export default function () {
  http.get("https://test.k6.io");
  sleep(1);
}
