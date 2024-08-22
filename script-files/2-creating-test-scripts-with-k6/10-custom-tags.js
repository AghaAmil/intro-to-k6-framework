import http from "k6/http";
import { Counter } from "k6/metrics";
import { check, sleep } from "k6";

export const options = {
  thresholds: {
    // Specific threshold for 'order' page
    // http_req_duration: ["p(95)<1000"],
    "http_req_duration{ page:order }": ["p(95)<1000"],

    // Error threshold specific to 'order' page
    http_errors: ["count==0"],
    "http_errors{ page:order }": ["count==0"],

    // Check pass rate specific to 'order' page
    checks: ["rate>=0.99"],
    "checks{ page:order }": ["rate>=0.99"],
  },
};

let httpErrors = new Counter("http_errors");

export default function () {
  let res = http.get("https://run.mocky.io/v3/ce66e1ce-df62-404a-9d45-e1a6dbeab785");

  // Increment error counter if there is an error
  if (res.error) {
    httpErrors.add(1);
  }

  // Check for status 200
  check(res, {
    "status is 200": (r) => r.status === 200,
  });

  // Submit order and tag the request
  // Custom tag added to measure the order page request duration
  res = http.get("https://run.mocky.io/v3/68d6054e-108f-462b-b1dc-45bb20975828?mocky-delay=2000ms", {
    tags: {
      page: "order", // Tagging this request with 'order' page
    },
  });

  if (res.error) {
    httpErrors.add(1, { page: "order" });
  }

  check(res, { "status is 201": (r) => r.status === 201 }, { page: "order" });

  sleep(1);
}
