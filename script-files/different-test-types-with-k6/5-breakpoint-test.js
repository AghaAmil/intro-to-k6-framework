import http from "k6/http";
import { sleep } from "k6";

// setting a configuration for a breakpoint test
export const options = {
  stages: [
    { duration: "2h", target: 100000 }, // Gradually increase to 100,000 users over 2 hours
  ],
};

export default function () {
  http.get("<https://test.k6.io>");
  sleep(1);
}
