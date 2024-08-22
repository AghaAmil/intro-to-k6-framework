import http from "k6/http";
import { sleep } from "k6";
import execution from "k6/execution"; // Importing execution module for aborting the test

// Test configuration: 10 virtual users (VUs) running for 60 seconds
export const options = {
  vus: 10,
  duration: "60s",
};

// Setup function: executed once before the VU stage starts
export function setup() {
  // Making a request to a status endpoint to check if the application is up
  let res = http.get("https://test.k6.local/status");

  // Checking if there's an error in the response
  if (res.error) {
    // Aborting the test if the application is down
    execution.test.abort("Aborting Test. Application is down");
  }
}

// Default function: executed repeatedly by each VU
export default function () {
  // Making a request to another endpoint
  http.get("https://test.k6.local/some-page");

  // Pausing the execution for 1 second between requests
  sleep(1);
}
