import http from "k6/http";
import { sleep, check, group } from "k6";

// Configuration Options
export const options = {
  thresholds: {
    http_req_duration: ["p(95)<250"], // Global threshold: 95th percentile of requests should be under 250 ms

    // Threshold for the 'Main Page' group, ensuring that 95% of requests within this group are under 200 ms
    "group_duration{ group:::Main Page }": ["p(95)<200"],

    // Threshold for the 'Assets' subgroup within 'Main Page', with the same time restriction
    "group_duration{ group:::Main Page::Assets }": ["p(95)<200"],
  },
};

// Main test function
export default function () {
  group("Main Page", function () {
    let res = http.get("https://test.k6.io/");

    // Verifying that the HTTP response status is 200 (OK)
    check(res, { "status is 200": (r) => r.status === 200 });

    // Subgroup for loading assets like CSS and JavaScript
    group("Assets", function () {
      http.get("https://test.k6.io/static/css/site.css");
      http.get("https://test.k6.io/static/js/prisms.js");
    });
  });

  group("News Page", function () {
    http.get("https://test.k6.io/news.php");
  });

  // Pausing the script for 1 second between iterations
  sleep(1);
}
