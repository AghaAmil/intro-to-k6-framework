import http from "k6/http";

export const options = {
  thresholds: {
    http_req_duration: ["p(95)<1000"], // p(95) should be less than 1000 milliseconds
    "http_req_duration{ status:200 }": ["p(95)<1000"], // p(95) requests with status code 200 should be less than 1000 milliseconds
    "http_req_duration{ status:201 }": ["p(95)<1000"], // p(95) requests with status code 200 should be less than 1000 milliseconds
  },
};

export default function () {
  http.get("https://run.mocky.io/v3/ce66e1ce-df62-404a-9d45-e1a6dbeab785");
  http.get("https://run.mocky.io/v3/68d6054e-108f-462b-b1dc-45bb20975828?mocky-delay=2000ms");
}
