By default, **k6** collects a variety of metrics during test runs. In this section, we will explore some of the key metrics that help evaluate application performance. Analyzing these metrics allows us to identify potential issues, understand their root causes, and resolve them before they affect real users.

## Key Metrics Overview

One of the most critical metrics in performance testing is **HTTP request duration**. This metric captures the time taken from sending an HTTP request to receiving the response. However, the output also includes additional statistics such as:

- **Average (mean)**: The arithmetic mean of all the request durations.
- **Median**: The middle value in the dataset, where 50% of the requests are faster, and 50% are slower.
- **Minimum (min)** and **Maximum (max)**: The fastest and slowest observed durations, respectively.
- **P90** and **P95**: Percentile values that help us understand the distribution of response times.

## Percentiles: P90 and P95

Percentiles offer a deeper view of the response time distribution, providing more insightful information than just averages. For example:

- **P90 (90th percentile)** means 90% of the requests were completed in the specified time or faster.
- **P95 (95th percentile)** means 95% of the requests were completed in the specified time or faster.

In the provided test result, **P90** is 402 milliseconds, indicating that 90% of the requests took 402ms or less, while **P95** is 404 milliseconds, meaning 95% of the requests were completed in that time or less.

## Why Use Percentiles?

Imagine you’re standing in line at an ice cream shop. If someone tells you the average wait time is 2 minutes, that doesn’t paint the full picture. In reality, 80% of customers might receive their ice cream in 20 seconds, while 20% may wait over 8 minutes. The average of 2 minutes doesn't represent either group accurately. Percentiles help in breaking down this disparity by showing what portion of the users experience quicker or slower response times.

Looking only at average metrics can be misleading because outliers (extremely fast or slow responses) skew the results. Percentiles give a clearer view by focusing on specific groups, such as the majority of users who receive a quick response, while disregarding occasional outliers.

## Service-Level Objectives (SLOs) and Percentiles

In performance monitoring, we typically work with **Service-Level Objectives (SLOs)**. SLOs define specific goals for application performance, such as response times and availability. For example, an SLO might state:

- **90% of requests should have a latency below 500 milliseconds**.
- **95% of requests should have a latency below 900 milliseconds**.
- **99% of requests should have a latency below 2.5 seconds**.

This ensures that most users receive a fast response, while a small percentage may experience a longer wait time, which is acceptable within the objective.

SLOs should not be confused with **Service-Level Agreements (SLAs)**, though they are related. SLOs set internal performance targets, while SLAs are formal agreements made with users or clients regarding expected performance.

## k6 Metrics and Limitations

k6 primarily focuses on client-side metrics, such as HTTP request durations, as illustrated in the test report. It doesn’t monitor server-side parameters like CPU, memory, or disk usage, as k6 isn’t connected to the servers hosting the application. Monitoring server health is crucial, but that’s beyond the scope of k6.

## Conclusion

When reviewing k6 test results, focus on **HTTP request duration** and **percentiles** (P90, P95) for a clearer picture of the overall performance. Avoid relying solely on averages, as they can obscure performance variations. Percentiles provide a more accurate representation of how most users experience the application.