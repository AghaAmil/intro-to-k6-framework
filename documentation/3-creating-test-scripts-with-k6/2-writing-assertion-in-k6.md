In this lecture, we will explore the **check** function within the k6 framework, which allows us to write assertions against the HTTP responses we receive during performance testing. Understanding the syntax and structure of assertions is crucial for effective testing.

## Sample Code

The following sample code demonstrates how to utilize the **check** function to validate responses:

```javascript
import http from "k6/http";
import { check } from "k6";

export default function () {
  const res = http.get("<https://test.k6.io>");

  // Inserting assertions for request status code and body
  check(res, {
    "status is 200": (r) => r.status === 200,
    "body is not empty": (r) => r.body.length > 0,
  });
}
```

## Assertions in k6

After receiving a response, it's common to verify certain aspects of that response. For example, we may want to confirm that:

1. The status code is `200`.
2. The response body is not empty.

### Syntax for Check Function

The **check** function requires two parameters:

1. **Data to Check**: Typically, this is the response object, but it can also be a boolean value for demonstration.
2. **An Object of Checks**: This object contains the assertions to evaluate.

### Example of Check Syntax

To illustrate how to use the **check** function, consider the following:

```javascript
check(true, {
  "true is true": (value) => value === true,
});
```

In this example, we are asserting that the value `true` is indeed `true`. This is just a basic example to demonstrate the syntax.

### Detailed Breakdown

1. **Importing Check**:
    - The check function is imported using destructuring:

        ```javascript
        import { check } from "k6";
        ```

2. **Creating an Assertion**:
    - The syntax is slightly different than other functions, as it involves passing an object where each property is a name for the check, and the value is a function that returns a boolean.
3. **Running a Check**:
    - After defining the checks, we can execute our script. If the assertions pass, they will appear in the metrics report.

### Common Issues

- If you do not import **check** correctly, you may encounter confusing errors without clear guidance. Ensure you are using the correct destructuring syntax:

    ```javascript
    import { check } from "k6";
    ```

- Removing the braces from the import statement will result in errors that may not directly indicate the issue. Always verify import statements if you experience unexpected behavior.

## Conclusion

Understanding the **check** function is essential for writing effective tests in the k6 framework. While the syntax may seem unusual at first, practice will help you become more comfortable with it. As you continue with your k6 learning, remember to focus on writing clear and comprehensive assertions to validate the performance and functionality of your applications.