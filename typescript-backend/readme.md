## Typescript backend

following the design patterns: 
    - chain of responsibility
        - split each out to route for *controlling* paths, service for handling business logic, and db for handling db interactions
    - factory pattern for instantiating the service and db classes, enabling easier swapping around if need comes
    