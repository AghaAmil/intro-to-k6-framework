JSON (JavaScript Object Notation) is a lightweight data-interchange format that is easy for humans to read and write, as
well as easy for machines to parse and generate. It is commonly used to transfer data between different systems, such as
between a server and a client.

## Why JSON?

JSON is used to transfer data between different systems that may be incompatible with each other in terms of programming
languages or data structures. By converting data into JSON, the information can be transferred as a string of text. Once
received, the JSON data can be parsed and converted back into a format that the receiving system can process.

## JSON Structure

JSON is a structured format that follows a simple key-value pattern. Each key is associated with a value, and the
key-value pairs are enclosed within curly braces `{}` to form an object.

**Basic JSON Example:**

```json
{
    "firstName": "John",
    "age": 22
}
```

- **Key-Value Pair:** In the example above, `"firstName"` is a key, and `"John"` is its corresponding value. Similarly,
  `"age"` is a key, and `22` is its value.
- **Data Types:**
    - Strings: `"John"` is a string, and in JSON, strings are always enclosed in double quotes.
    - Numbers: `22` is a number and does not need quotes.
    - Booleans: Values like `true` or `false` are booleans and do not require quotes.
    - Arrays: Lists of values are enclosed in square brackets `[]`.
    - Objects: More complex structures containing multiple key-value pairs are enclosed in curly braces `{}`.

## Important Notes:

- **Commas:** Separate key-value pairs within an object. Do not add a comma after the last key-value pair in an object.
- **Quotes:** JSON requires double quotes for both keys and string values. Single quotes will render the JSON invalid.
- **Arrays:** An array in JSON is an ordered collection of values, which can be of any data type (strings, numbers,
  objects, etc.).

**Complex JSON Example:**

```json
{
    "firstName": "John",
    "age": 22,
    "isMarried": false,
    "hobbies": [
        "Netflix",
        "mountain biking"
    ]
}
```

In this example:

- `"firstName"` is a key with a string value `"John"`.
- `"age"` is a key with a numeric value `22`.
- `"isMarried"` is a key with a boolean value `false`.
- `"hobbies"` is a key with an array of strings as its value.

## JSON Arrays of Objects

JSON can also represent an array of objects, each with its own set of key-value pairs.

**Example:**

```json
[
    {
        "firstName": "John",
        "age": 22
    },
    {
        "firstName": "Jane",
        "age": 24
    }
]
```

Here:

- The square brackets `[]` indicate an array.
- The array contains two objects, each enclosed in curly braces `{}`.
- Each object represents an individual entity with properties such as `"firstName"` and `"age"`.

## Recap (Using Visuals)

- **Array:** Denoted by square brackets `[]`.
- **Object:** Denoted by curly braces `{}`.
- **Key:** The identifier for a piece of data.
- **Value:** The actual data, which can be a string, number, boolean, array, or another object.

**Image 1 Recap:**

- The first image illustrates an array of objects. The array is enclosed by square brackets, and each object inside it
  is enclosed by curly braces.

**Image 2 Recap:**

- The second image breaks down the structure of an object in JSON, showing the keys and their respective values. It
  highlights that strings, numbers, and booleans are treated differently in JSON, with strings requiring quotes and
  numbers and booleans not requiring them.

Understanding and adhering to the JSON structure is crucial when working with APIs, as invalid JSON will cause
communication issues between systems.