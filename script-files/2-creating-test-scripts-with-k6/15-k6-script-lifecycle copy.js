import http from "k6/http";
import { sleep } from "k6";

export const option = {
  vus: 1,
  duration: "5s",
};

console.log("-- init Stage --");

export function setup() {
  console.log("-- Setup Stage --");
  sleep(10);
  const data = { foo: "bar" };
  return data;
}

export default function (data) {
  console.log("-- VU Stage --");
  console.log(data);
  sleep(1);
}

export function teardown() {
  console.log("-- Teardown Stage --");
}
