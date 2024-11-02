## Navigating and Verifying API Responses with k6

When interacting with REST APIs, it's common to work with both endpoints that return lists of resources and those that
return a single resource. Understanding how to interact with these endpoints and verify the data returned is crucial for
effective API testing. In this guide, we will explore how to navigate through API responses and validate them using k6.

## Sample Code

Consider the following k6 script:

```javascript
import http from "k6/http";
import {check} from "k6";

export default function () {
    let res = http.get("<https://test-api.k6.io/public/crocodiles/>");
    res = http.get("<https://test-api.k6.io/public/crocodiles/7/>");

    check(res, {
        "Status is 200": (r) => r.status === 200,
        "Crocodile's name is Sobek": (r) => r.json().name === "Sobek",
        // "Crocodile's name is Sobek": (r) => r.body.includes("Sobek"),
    });
}
```

## Understanding the API Response

Let's first examine the response we get when retrieving all the crocodiles from the API:

- **Request:** `https://test-api.k6.io/public/crocodiles/`
- **Response:** A JSON array containing individual crocodile objects.

When you make a request to the `/public/crocodiles/` endpoint, the response is a list (denoted by square brackets `[]`)
of crocodile objects. Each object represents a crocodile, with properties such as `id`, `name`, etc.

It is common for REST APIs to offer endpoints for retrieving lists of objects as well as endpoints for retrieving a
single object by its identifier (ID). For instance, the API documentation might provide an endpoint like
`/public/crocodiles/{id}` to get a specific crocodile.

## Retrieving a Single Resource

To get a specific crocodile, such as "Sobek" (a crocodile named after the Egyptian god), you would use the following
endpoint:

```bash
<https://test-api.k6.io/public/crocodiles/7/>

```

Here, `7` is the ID of the crocodile "Sobek". In Postman, you might try different IDs to find the correct one and
confirm the response is as expected.

## Making Requests in k6

In the k6 script, we simulate retrieving the crocodile with ID `7`. After making the request, we use the `check`
function to verify the response:

- **Status Code Check:** Ensure that the response status is `200 OK`.
- **Name Check:** Verify that the crocodile's name is "Sobek".

### Example:

```javascript
check(res, {
    "Status is 200": (r) => r.status === 200,
    "Crocodile's name is Sobek": (r) => r.json().name === "Sobek",
});
```

## Troubleshooting Common Issues

When running your script, you might encounter issues, such as errors indicating that a function is not recognized or
that an object is not being handled correctly. Here are some tips for troubleshooting:

1. **Identify the Error:** If you see an error like `TypeError: not a function`, it usually points to a mistake in how
   you’re trying to access a property or method.
2. **Check Your Imports:** Ensure that the necessary functions (like `check`) are correctly imported and deconstructed
   in your script.
3. **Use Console Logs for Debugging:** To understand the structure of the response object, use `console.log` to inspect
   it before applying checks. For instance:

    ```javascript
    console.log(res.json().name);
    ```

   This helps verify that you’re accessing the correct property.

4. **JSON Parsing:** Remember that the response body is initially just a string of text. To work with it as a JavaScript
   object, parse it using the `.json()` method:

    ```javascript
    let crocodile = res.json();
    ```

   Once parsed, you can easily access properties like `crocodile.name`.

## Handling Unexpected Responses

Consider a scenario where the endpoint unexpectedly returns all crocodiles instead of just one. This could happen due to
a bug or misconfiguration. If your script is still checking for "Sobek" in a list of crocodiles, it might pass even
though the response isn’t what you intended to validate.

## Example of Improved Check:

Instead of checking if the response body "includes" a name, directly verify the `name` property of the parsed JSON
object:

```javascript
check(res, {
    "Crocodile's name is Sobek": (r) => r.json().name === "Sobek",
});
```

This approach ensures that you’re validating exactly what you expect—an individual resource’s property—not just a
substring in a larger response.

## Conclusion

By understanding how to navigate and verify API responses using k6, you can ensure that your tests accurately reflect
the behavior of the API. Always start by inspecting your response objects with `console.log`, then proceed to write
checks that validate the exact properties you care about. This methodical approach will help you catch issues early and
ensure that your API is functioning as expected.