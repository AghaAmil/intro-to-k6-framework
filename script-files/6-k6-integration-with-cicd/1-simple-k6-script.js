import http from "k6/http";
import { sleep } from "k6";

export const options = {
  thresholds: {
    http_req_duration: ["p(95)<30"],
  },
};

export default function () {
  http.get("https://test.k6.io");
  sleep(1);
}
