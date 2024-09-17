In this section, we explore how to define virtual users (VUs) and test duration in a load test using the k6 framework.

## Code Example

```javascript
import http from "k6/http";
import { sleep } from "k6";

// Configuration for the load test
export const options = {
  vus: 10,           // Number of virtual users
  duration: "10s",    // Duration of the load test
};

export default function () {
  http.get("<https://test.k6.io>");  // HTTP GET request to test endpoint
  sleep(1);  // Pauses for 1 second between requests
}
```

## Execution Overview

When the script above is executed, k6 will simulate 10 virtual users over a period of 10 seconds. Each virtual user will repeatedly send HTTP requests to the specified endpoint ([https://test.k6.io](https://test.k6.io/)) during this duration.

The terminal output from the test execution is displayed below:

```vbnet
execution: local
script: first-script.js
scenarios: (100.00%) 1 scenario, 10 max VUs, 40s max duration (incl. graceful stop):
  * default: 10 looping VUs for 10s (gracefulStop: 30s)
...
iterations: 139
vus: 10
vus_max: 10
```

## Key Insights:

1. **Virtual Users (VUs)**: The script specifies 10 virtual users, meaning that 10 independent simulated users will run concurrently during the test.
2. **Duration**: The test runs for 10 seconds. However, if a longer duration is required, this can be modified by adjusting the value in the `duration` field (e.g., "60s" for 60 seconds).
3. **Iterations vs. Requests**: In this particular run, there were 139 iterations and 278 HTTP requests. The discrepancy between iterations and requests is usually due to redirections happening in the background. In this case, using "http" instead of "https" triggered an automatic redirect.
4. **HTTP Redirects**: To avoid unnecessary redirects, always use "https" for endpoints that support secure connections. Running the test again with "https" ensures that the number of iterations matches the number of requests.

## Adding Pauses Between Requests:

To simulate real user behavior, it is useful to introduce a short pause between requests. This can be achieved using the `sleep()` function provided by k6. The `sleep()` function pauses the virtual user for a specified number of seconds after each request.

```javascript
import { sleep } from "k6";
http.get("<https://test.k6.io>");
sleep(1);  // Pauses for 1 second after each request
```

By adding this pause, the number of iterations and requests will decrease as the virtual users are now waiting between each request. For example, the number of iterations dropped to 70 when a 1-second pause was introduced in the script.

## Error Handling in k6

Errors in k6 scripts can result from several factors, such as syntax issues or connection problems. Some common errors include:

- **Syntax Errors**: If there is a missing comma or incorrect JavaScript syntax in the script, k6 will flag the error immediately, and the test will not proceed until the issue is resolved.
- **Undefined Functions**: If a function like `sleep()` is not imported properly, k6 will raise an error indicating that the function is not defined.
- **Connection Errors**: If an invalid URL is used, k6 will display connection errors such as "No such host." This indicates that the endpoint cannot be reached.

When encountering an error, it's important to review the error message and trace back to the last working version of the script. Testing with a small number of virtual users and a short duration is also advisable to ensure everything works correctly before scaling up.

## Conclusion:

In this section, we have learned how to configure virtual users and test duration, handle HTTP redirects, introduce pauses between requests, and address common errors in k6 scripts. These concepts are crucial for creating efficient and realistic performance tests using k6.