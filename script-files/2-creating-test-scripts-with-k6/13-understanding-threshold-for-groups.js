import http from "k6/http";
import { sleep, check, group } from "k6";

// Configuration Options
export const options = {
  thresholds: {
    // Global threshold for request duration (95th percentile < 250ms)
    http_req_duration: ["p(95)<250"],

    // Threshold for the Main Page group to complete within 8 seconds (95th percentile)
    "group_duration{ group:::Main Page }": ["p(95)<8000"],

    // Threshold for the News Page group to complete within 6 seconds (95th percentile)
    "group_duration{ group:::News Page }": ["p(95)<6000"],

    // Threshold for the Assets subgroup under Main Page to complete within 3 seconds (95th percentile)
    "group_duration{ group:::Main Page::Assets }": ["p(95)<3000"],
  },
};

// Main test function
export default function () {
  // Main Page group with a 5-second delay
  group("Main Page", function () {
    let res = http.get("https://run.mocky.io/v3/68d6054e-108f-462b-b1dc-45bb20975828?mocky-delay=5000ms");

    // Checking that the response status is 200 (OK)
    check(res, { "status is 200": (r) => r.status === 200 });

    // Subgroup for Assets with a delay of 1 second for each request
    group("Assets", function () {
      http.get("https://run.mocky.io/v3/68d6054e-108f-462b-b1dc-45bb20975828?mocky-delay=1000ms");
      http.get("https://run.mocky.io/v3/68d6054e-108f-462b-b1dc-45bb20975828?mocky-delay=1000ms");
    });
  });

  // News Page group with a 5-second delay
  group("News Page", function () {
    http.get("https://run.mocky.io/v3/68d6054e-108f-462b-b1dc-45bb20975828?mocky-delay=5000ms");
  });

  // Pausing the script for 1 second between iterations
  sleep(1);
}
