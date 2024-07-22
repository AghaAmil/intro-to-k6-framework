import http from "k6/http";
import { sleep } from "k6";

// setting a configuration for a smoke test
export const options = {
  vus: 1, // number of virtual users
  duration: "30s", // load test duration
};

export default function () {
  /*
  check the first page
  pauses for a second 
  check the next page
  pauses for the two seconds
  ....
  */

  http.get("https://test.k6.io");
  sleep(1); // pauses for 1 second
  http.get("https://test.k6.io/contacts.php");
  sleep(2); // pauses for 2 seconds
  http.get("https://test.k6.io/news.php");
  sleep(2);
}

/*

creating failure scenarios:
1. change the first request to .local and check the result
2. change the second request to contact.php to cause 404 error

*/
