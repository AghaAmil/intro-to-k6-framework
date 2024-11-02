When working with APIs, it is crucial to understand both the request and the response structures. This allows you to
debug effectively when something doesn’t work as expected. While using `console.log` statements is a common method to
inspect the response data, k6 offers a more structured way to debug HTTP requests and responses.

Let's start with a basic k6 script:

```javascript
import http from "k6/http";

export default function () {
    const res = http.get("<https://test-api.k6.io/public/crocodiles/>");
    console.log(res);
}
```

In this script, we make a simple GET request to an API endpoint and log the response to the console. However, logging
the entire response can flood your console with too much information, especially when dealing with complex responses.

## Using the `http-debug` Flag for Better Debugging

Instead of relying solely on `console.log`, k6 provides a more organized way to inspect HTTP requests and responses
using the `http-debug` flag. This flag helps you see the details of your requests and responses without overwhelming you
with information.

### Step 1: Remove the Console Log

First, remove the `console.log(res);` line from your script to avoid cluttering the output.

```javascript
import http from "k6/http";

export default function () {
    http.get("<https://test-api.k6.io/public/crocodiles/>");
}
```

## Step 2: Use the `http-debug` Flag

Next, modify your k6 run command to include the `http-debug` flag. This flag will allow you to see the HTTP request and
response details in a more structured format.

```bash
k6 run --http-debug script.js
```

When you run the script with this command, the output will include detailed information about the HTTP requests and
responses, such as:

- **Request Information:** The endpoint used (`https://test-api.k6.io/public/crocodiles/`), the base URL (
  `test-api.k6.io`), and any additional headers automatically added by k6.
- **Response Information:** The status code (e.g., `200 OK`), response headers, and more.

## Step 3: Viewing the Full HTTP Body

By default, the `http-debug` flag hides the body of the requests and responses, as these can contain large amounts of
data. If you need to inspect the body, you can modify the command to include `http-debug="full"`:

```bash
k6 run --http-debug="full" script.js
```

This command will display the complete body of the HTTP response:

- **Response Body:** After the headers, you'll see the full response body. While it might not be as readable as in
  Postman, it still helps you understand what data you're sending and receiving.

## Why Debugging is Important

Understanding the structure of your HTTP requests and responses at a technical level is critical. If something goes
wrong, the ability to debug effectively can help you identify the root cause and fix issues quickly.

By using the `http-debug` flag, you gain better insights into your API interactions, ensuring that the requests you send
and the responses you receive match your expectations.