import http from "k6/http";
import { sleep } from "k6";

// Configuration for the load test
export const options = {
  vus: 10,           // Number of virtual users
  duration: "10s",    // Duration of the load test
};

export default function () {
  http.get("https://test.k6.io");  // HTTP GET request to test endpoint
  sleep(1);  // Pauses for 1 second between requests
}
