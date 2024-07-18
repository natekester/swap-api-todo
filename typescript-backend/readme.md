## Typescript backend

following the design patterns:
- chain of responsibility
- split each out to route for _controlling_ paths, service for handling business logic, and db for handling db interactions
- factory pattern for instantiating the service and db classes, enabling easier swapping around if need comes

## Test patterns
In order to ensure our tests are not limited by the very repositories I utilize to build the api's, i created a test repository that's purposes will be testing oriented. If my main repositories are damaged, the test repositories will be the baseline.

