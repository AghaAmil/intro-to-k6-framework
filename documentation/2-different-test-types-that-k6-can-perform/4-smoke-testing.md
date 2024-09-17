# Understanding of Smoke Testing

The primary objective of a smoke test is to verify whether the test script and the application under test are functioning as expected before proceeding with more extensive testing.

## Origin of the Term "Smoke Test"

The term **smoke test** originally comes from the field of hardware testing. When engineers first powered up new electronic equipment, they would observe it closely to detect any visible smoke. Smoke would indicate a critical failure in the hardware’s assembly or design. This practice was a simple, preliminary test to determine if the hardware was fundamentally flawed.

Similarly, in construction, if we were testing the stability of a new bridge, we would begin by driving one or two vehicles over it to see if it remains structurally sound. This minimal testing helps to identify major flaws without conducting a full-scale load test.

## Smoke Testing in Software

In the software industry, the concept of smoke testing has been adapted to verify the basic functionality of an application. The smoke test is a small, preliminary test designed to determine if an application is stable enough to undergo further, more detailed testing.

If the application passes the smoke test, it indicates that it is functioning well enough to proceed with more intensive tests. However, if it fails, it means there are critical issues that must be addressed immediately. For instance, if the application is offline, there is no point in subjecting it to a large load test, as it cannot even handle a single user.

## Purpose of Smoke Testing in Performance Testing

In performance testing, a smoke test typically involves sending a single virtual user to the application to ensure it responds as expected. This simple test not only verifies the basic functionality of the application but also confirms that the test script itself is working as intended. Even a minor bug in the test script can result in wasted effort and incorrect results.

Additionally, a smoke test helps establish **baseline metrics** for the application’s performance under minimal load. With only 2 or 3 users, the application is tested in its optimal state, and the resulting metrics provide a useful reference point for future tests. As the load increases in subsequent tests, these baseline values will help in evaluating the application's scalability and performance.

# Smoke Testing with K6

Smoke testing is a quick and minimal form of testing used to verify the basic functionality of an application. It ensures that critical parts of the system work as expected before more exhaustive tests or deployments. In this guide, we will explain how to conduct a smoke test using the k6 framework, highlight best practices, and discuss key features of smoke testing.

## Key Features of Smoke Testing

1. **Quick Validation:** Smoke tests are designed to quickly verify that the most essential functionality of the application works.
2. **Minimal Load:** They involve minimal load (typically one or two virtual users) to avoid overloading the system.
3. **Early Detection of Issues:** Smoke tests help detect severe issues early in the testing or deployment process, such as broken endpoints or server outages.
4. **Non-Performance Focused:** The goal is not to measure performance but to ensure that basic functionalities are intact and responding correctly.

## Example Smoke Test Script in k6

```javascript
import http from "k6/http";
import { sleep } from "k6";

// Configuration for a smoke test
export const options = {
    vus: 1, // Number of virtual users
    duration: "30s", // Duration of the test
};

export default function () {
    // Visit the homepage
    http.get("<https://test.k6.io>");
    sleep(1); // Pause for 1 second

    // Visit the contacts page
    http.get("<https://test.k6.io/contacts.php>");
    sleep(2); // Pause for 2 seconds

    // Visit the news page
    http.get("<https://test.k6.io/news.php>");
    sleep(2); // Pause for 2 seconds
}
```

## Code Explanation

1. **Test Configuration:**
    - `vus: 1`: A single virtual user is enough for a smoke test.
    - `duration: "30s"`: The test will run for 30 seconds, during which the virtual user will visit multiple pages.
2. **Page Visits:**
    - The test simulates visits to three different URLs (`/`, `/contacts.php`, and `/news.php`).
    - After each request, the script pauses (`sleep`) to simulate real user interaction. Pausing also reduces the strain on the server.
3. **Error Handling:**
    - In the case of an invalid URL or a non-existing page (e.g., a 404 error), k6 will log the failed request, allowing you to investigate issues before further testing or deployment.

## Best Practices for Smoke Testing

1. **Keep it Simple:** A smoke test should validate only the most critical functions of the system. Focus on key pages or APIs that represent the core functionality of the application.
2. **Short Duration:** Keep the test duration short, typically 30–60 seconds, with a minimal number of virtual users. The goal is to validate functionality quickly, not to perform stress testing.
3. **Fail Fast:** If the application fails a smoke test, stop further tests immediately. Smoke tests should give you confidence that the system is stable enough to handle more rigorous testing.
4. **Check Key Endpoints:** Ensure the test covers essential application endpoints, such as login pages, landing pages, or any API used in critical business flows.
5. **Monitor Failures Closely:** Investigate failed requests or errors immediately. For instance, a 404 error from a missing page should be addressed before proceeding with additional tests.
6. **Automate Smoke Tests:** Automate smoke tests in your CI/CD pipeline to catch potential issues early, ensuring that deployments happen only after smoke tests pass.

## Running the Smoke Test

To run the test, execute the following command in your terminal:

```bash
k6 run smoke-test.js
```

This will trigger the smoke test using the script you’ve written. After the test completes, k6 will generate a report with key metrics such as the number of failed HTTP requests, the total requests made, and the number of iterations performed.

## Sample Output and Analysis

Once the test finishes, you’ll receive a summary that contains important metrics:

1. **Failed Requests:**
    - Ideally, a smoke test should have 0% failed requests. If you see failures (e.g., a 404 or a server timeout), it’s an indicator that something is wrong with the application or server setup.
2. **Requests Sent:**
    - The report will show how many requests were sent during the test. This provides an overview of how often the virtual user executed the script.
3. **Iterations:**
    - An iteration represents how many times the script’s `default` function ran within the test duration. For example, a single virtual user could visit all the pages six times in a 30-second test, depending on the speed of the requests.

## Handling Smoke Test Failures

Failures in smoke tests should be addressed immediately. Below are common causes of failure and how to handle them:

1. **Server Offline or Unavailable:**
    - Modify the script to simulate a server outage by replacing a valid URL with a non-existent one (e.g., `https://test.k6.local`). This will result in a failed request, indicating that the server is unreachable.
2. **Page Not Found (404 Error):**
    - If a page has been removed from the server but the test script still points to it, k6 will report a 404 error. This serves as a reminder to update the test scripts if there have been changes to the application structure.
3. **Warnings and Errors:**
    - Any warning messages during the test should be investigated. Warnings often indicate minor issues with the script or server configuration that can be resolved before running full-scale tests.

## Benefits of Smoke Testing

1. **Efficiency:** Smoke tests run quickly, usually taking less than a minute, and provide immediate feedback on the health of the application.
2. **Early Issue Detection:** They help identify major issues early in the development or deployment pipeline, preventing larger problems down the line.
3. **Continuous Monitoring:** Smoke tests can be integrated into your CI/CD pipeline to continuously monitor the application and detect issues in production environments with minimal load.

## Conclusion

Smoke testing is a vital step in validating the basic functionality of an application before conducting more extensive tests. By keeping the test simple, focused, and efficient, you can ensure the application is stable and ready for further testing. Using k6 for smoke testing allows you to quickly automate and integrate these tests into your CI/CD pipeline, providing fast feedback and early detection of issues with minimal load on the system.