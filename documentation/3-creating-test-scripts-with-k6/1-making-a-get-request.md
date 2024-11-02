In this section, we will learn how to make HTTP requests using the k6 framework. This lecture will cover the basics of scripting and utilizing the built-in HTTP library.

## Sample Code

```javascript
import http from "k6/http";

export default function () {
  // Using the GET method of HTTP
  const res = http.get("<https://test.k6.io>");

  // Print the status code of the request
  console.log(`The Response Status Code = ${res.status}`);

  // Print the body of the response
  console.log(res.body);
}
```

## Overview

To start, we will create our script from scratch, focusing on making HTTP requests with k6. Although we have previously covered this topic, it is crucial to revisit the concepts and understand why we perform each step.

### Step 1: Define the Function

At the core of our script is a function that k6 will execute. We define this function using `export default`, creating an unnamed function that will contain our HTTP request logic.

### Step 2: Import the HTTP Library

To make HTTP requests, we must import the HTTP library, as it is not included by default in k6. At the top of your script, add the following line:

```javascript
import http from "k6/http";
```

This line grants us access to the HTTP methods we can use, such as GET, POST, PUT, etc.

### Step 3: Making a GET Request

For our example, we will perform a GET request to retrieve data from a website. We use the `http.get` method and provide the URL as a string:

```javascript
const res = http.get("<https://test.k6.io>");
```

### Step 4: Storing the Response

Once the GET request is made, it is important to store the server's response. We typically assign the response to a variable, such as `res`, to access its properties:

```javascript
const res = http.get("<https://test.k6.io>");
```

### Step 5: Logging the Response

We can now log the response status and body using the following lines:

```javascript
console.log(`The Response Status Code = ${res.status}`);
console.log(res.body);
```

When running the script, if the request is successful, you will see a status code of `200`, indicating that everything went well.

### Handling Errors

If we attempt to access a non-existent page, for example, `https://test.k6.io/foo.html`, the status code will be `404`, indicating that the page could not be found. You can check this by running the script and observing the output:

```javascript
const res = http.get("<https://test.k6.io/foo.html>");
console.log(`The Response Status Code = ${res.status}`);
console.log(res.body);
```

## Conclusion

In summary, to make HTTP requests with k6, follow these steps:

1. Import the HTTP library.
2. Define a function to execute your requests.
3. Use the appropriate HTTP method (e.g., GET) to make requests.
4. Store the response in a variable.
5. Log the response status and body as needed.