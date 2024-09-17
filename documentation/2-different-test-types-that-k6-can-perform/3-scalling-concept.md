Before diving deeper into testing, it's essential to understand key concepts around **scaling**. Throughout this documentation, the terms "system" or "application" will be used interchangeably to refer to IT systems, though the correct terminology would be "IT system" or simply "system". For simplicity, we will occasionally use the term "application" or "app" as well.

## Applications and Servers

Applications typically run on servers. While servers might seem complex, they function similarly to the computer you're using. Have you ever experienced a computer crash or an application freezing? This often happens when the system consumes too much computing power or memory, leading to crashes. The same can occur with servers when too many users access the application simultaneously.

## How IT Systems Scale

The question arises: how can an IT system handle more users as demand grows? To understand this, consider an analogy.

Imagine a city that grows more popular every year, attracting new residents. Initially, there's a single building that houses everyone. As more people move in, the building becomes overcrowded, resulting in long waiting lists. To accommodate the growing population, one option is to add more floors to the building, increasing its capacity. This is known as **vertical scaling** (or scaling up), where a server's capacity is boosted by adding more memory or a faster CPU.

Alternatively, rather than expanding a single building, you could construct multiple buildings across the city. Each building houses a certain number of residents, collectively supporting more people than the original building could. This is known as **horizontal scaling** (or scaling out), where additional servers are used to distribute the load among them.

In summary:

- **Vertical scaling** is like adding more floors to one building.
- **Horizontal scaling** is like constructing multiple buildings to accommodate more residents.

## Limits of Vertical and Horizontal Scaling

While vertical scaling is useful, it has physical limitations. The higher you build, the more expensive it becomes, and at a certain point, vertical scaling is no longer practical. Additionally, having an extremely powerful server may result in inefficiencies during periods of low usage, leaving resources like CPU and memory underutilized.

On the other hand, horizontal scaling allows for a more flexible approach. You can use multiple smaller servers to handle high loads, and scale down by reducing the number of servers during low demand periods. **Cloud providers** make this approach feasible with elastic scaling, where you only pay for the resources you actually use.

However, horizontal scaling isn't always straightforward. **Older applications** often have a **monolithic architecture**, meaning that all components are tightly coupled and must be deployed together on a single server. This makes it challenging to distribute the application across multiple servers.

In contrast, **microservices architecture** consists of loosely coupled components or services that can be scaled independently. This allows each server to handle only the services it needs, optimizing resource usage.

## Balancing Infrastructure Costs

Optimizing infrastructure costs is crucial for any business. Running a massive infrastructure that operates at only 10% capacity for most of the year, except during peak events, is not cost-effective. At the same time, re-engineering a monolithic application into microservices can be a costly and time-consuming effort.

Organizations must weigh the trade-offs between:

1. Paying for underutilized infrastructure.
2. Investing in development to reduce infrastructure costs through architectural improvements.

There is no one-size-fits-all solution. The right approach depends on the specific needs of the application and the organization’s resources.