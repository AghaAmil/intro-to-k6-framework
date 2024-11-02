## Sample Code

The following code demonstrates the use of assertions in k6 to validate HTTP responses:

```javascript
import http from "k6/http";
import {check} from "k6";

export default function () {
    const res = http.get("<https://test.k6.io>");

    // Uncomment the line below to cause an error for demonstration purposes
    // const res = http.get("<https://test.k6.io/contacts.php>");

    console.log(res.body);

    // Performing assertions to validate the response
    check(res, {
        "status is 200": (r) => r.status === 200,
        "page is startpage": (r) => r.body.includes("Collection of simple web-pages suitable for load testing."),
    });
}
```

## Overview

In this lecture, we will explore how to utilize the `check` function in k6 to create assertions against the HTTP
response received from a request. This is crucial for verifying that our applications behave as expected under load.

### Key Assertions

1. **Status Code Validation**:
    - The first check verifies that the response status code is `200`, indicating a successful request.
    - We dynamically access the response status using:

        ```javascript
        "status is 200": (r) => r.status === 200
        ```

2. **Body Content Validation**:
    - The second check ensures that the body of the response includes a specific string, confirming that the expected
      content is present.
    - We check for the presence of the string as follows:

        ```javascript
        "page is startpage": (r) => r.body.includes("Collection of simple web-pages suitable for load testing.")
        ```

## Detailed Explanation

### Setting Up the Checks

- Each assertion is defined within the `check` function as a key-value pair, where the key is a descriptive name for the
  check and the value is a function that returns a boolean indicating the result of the check.
- The response object (`res`) contains properties like `status` and `body`, which we can access to perform our
  validations.

### Testing Assertions

- It is essential to test assertions thoroughly to ensure they are functioning correctly. For instance, if we modify the
  URL to an invalid endpoint (e.g., `https://test.k6.io/foo`), we expect the status check to fail.
- If the comparison operator is incorrectly used (e.g., using a single equal sign instead of a double or triple equal
  sign), the assertion may yield misleading results. Therefore, verifying that assertions fail when they should is
  critical in the development process.

### Comprehensive Validations

- Besides checking the status code, we should also validate the body content. For example, if the response has a status
  code of `200`, it does not guarantee that the content is as expected. Thus, it is advisable to perform both checks to
  ensure the application's integrity.

## Combining Checks

Multiple assertions can be consolidated into a single object passed to the `check` function. This approach maintains
clarity while reducing redundancy:

```javascript
check(res, {
    "status is 200": (r) => r.status === 200,
    "page contains expected text": (r) => r.body.includes("Collection of simple web-pages suitable for load testing."),
});
```

## Conclusion

In k6, writing assertions is vital for automated performance testing. By leveraging the `check` function, we can ensure
that our applications behave correctly under various conditions without manual intervention. Continuous validation of
our tests is necessary to detect issues early and maintain application reliability.

### Best Practices

- Always execute your tests after writing assertions to verify their functionality.
- If an assertion fails, review the changes made since the last successful test to identify the cause of the failure.
- Utilize descriptive names for checks to enhance the clarity of your test reports.

By following these guidelines, you will enhance the effectiveness of your performance tests and ensure robust
application quality.