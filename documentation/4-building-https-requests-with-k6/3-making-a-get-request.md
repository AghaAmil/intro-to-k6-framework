## Sample Code Overview

```javascript
import http from "k6/http";

export default function () {
    const res = http.get("<https://test-api.k6.io/public/crocodiles/>");
    console.log(res);
}
```

In this section, we will explore using a service provided by k6, accessible at [**https://test-api.k6.io
**](https://test-api.k6.io/), which you can find linked in the resources folder. This website serves as interactive
documentation for an API that allows you to manage crocodiles—yes, you read that correctly: crocodiles.

## Understanding the API

This API is a **REST API**, which is an architectural style commonly used for designing APIs. REST APIs are widely
adopted, making it highly likely that you will encounter them in your work. The API is organized into different
sections:

- **Public APIs**: Accessible without authentication.
- **Registration and Authentication**: Endpoints for managing user accounts.
- **Private APIs**: Restricted to authenticated users.

## HTTP Request Methods

HTTP supports various request methods, with **GET** being one of the most common. The **GET** method is used to retrieve
information from the server. Other methods include **POST**, **PUT**, **PATCH**, and **DELETE**, each serving a specific
purpose for interacting with resources on the server.

## Making a Request to the Public Endpoint

Let’s examine a simple example using the **GET** method:

1. **Public Endpoint**: The API provides a public endpoint to retrieve a list of crocodiles. This endpoint is part of a
   RESTful design where resources are represented by URLs. For example:
    - A list of crocodiles might be accessible at `/public/crocodiles`.
    - An individual crocodile could be accessed via `/public/crocodiles/{id}`.
2. **Base URL and Endpoint**: The API documentation typically displays only the endpoint path, such as
   `/public/crocodiles`, but to make a request, you need to use the full address:
    - **Base URL**: `https://test-api.k6.io`
    - **Complete Endpoint**: `https://test-api.k6.io/public/crocodiles`

## Using Postman to Test the API

To interact with this API using **Postman**:

1. **Open Postman** and create a new tab.
2. **Paste the Complete Endpoint**: `https://test-api.k6.io/public/crocodiles`.
3. **Select the HTTP Request Method**: By default, **GET** is selected.
4. **Send the Request**: Click the **Send** button to execute the request.

The response will appear in the body section of Postman. You will notice that the response data is in **JSON (JavaScript
Object Notation)** format, which is commonly used for transmitting information between servers. Unlike a traditional
webpage, JSON is plain data without styling, fonts, or images. It’s meant to be easily processed by computers, though it
remains relatively readable to humans.

## Interpreting the Response

Upon successfully sending the request, you should receive a response with:

- **Status Code**: `200 OK`, indicating the request was successful.
- **Response Body**: A list of crocodiles, with details such as ID, name, sex, date of birth, and age.

## Recreating the Request in k6

Now, let's replicate this request using **k6**:

1. **Import the HTTP Module**: To make HTTP requests in k6, start by importing the necessary module:

    ```javascript
    import http from "k6/http";
    ```

2. **Create a Default Function**: Inside the function, use the `http.get` method to make the GET request:

    ```javascript
    export default function () {
      const res = http.get("<https://test-api.k6.io/public/crocodiles/>");
    }
    ```

3. **Log the Response**: To view the response data, store it in a variable and log it to the console:

    ```javascript
    console.log(res);
    ```

4. **Running the Script**: Execute the k6 script to send the request. The response data will be logged, though it may
   initially appear complex. We will delve deeper into interpreting this information later.