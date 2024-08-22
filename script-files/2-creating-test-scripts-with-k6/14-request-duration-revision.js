import http from "k6/http";
import { sleep, check, group } from "k6";

// Configuration Options
export const options = {
  thresholds: {
    // Global threshold for request duration (95th percentile < 1000ms)
    http_req_duration: ["p(95)<1000"],

    // Threshold for valid responses only (95th percentile < 1000ms)
    "http_req_duration{ expected_response:true }": ["p(95)<1000"],

    // Threshold for the Main Page group to complete within 3 seconds (95th percentile)
    "group_duration{ group:::Main Page }": ["p(95)<3000"],

    // Threshold for the News Page group to complete within 1 second (95th percentile)
    "group_duration{ group:::News Page }": ["p(95)<1000"],

    // Threshold for the Assets subgroup under Main Page to complete within 1 second (95th percentile)
    "group_duration{ group:::Main Page::Assets }": ["p(95)<1000"],
  },
};

// Main test function
export default function () {
  // Main Page group with a 900ms delay
  group("Main Page", function () {
    let res = http.get("https://run.mocky.io/v3/68d6054e-108f-462b-b1dc-45bb20975828?mocky-delay=900ms");

    // Checking that the response status is 200 (OK)
    check(res, { "status is 200": (r) => r.status === 200 });

    // Subgroup for Assets with two requests, each delayed by 900ms
    group("Assets", function () {
      http.get("https://run.mocky.io/v3/68d6054e-108f-462b-b1dc-45bb20975828?mocky-delay=900ms");
      http.get("https://run.mocky.io/v3/68d6054e-108f-462b-b1dc-45bb20975828?mocky-delay=900ms");
    });
  });

  // News Page group
  group("News Page", function () {
    http.get("https://run.mocky.io/v3/d751de5f-4529-4327-a891-62afc5c06a5c");
  });

  // Pausing the script for 1 second between iterations
  sleep(1);
}
