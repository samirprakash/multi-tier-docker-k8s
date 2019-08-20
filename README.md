# Multi Tier Docker k8s Application

#### Architecture

![alt project architecture](./screenshots/multi-tier-docker-k8s-setup.png)

##### Create PG Secret

- `kubectl create secret generic postgres-password --from-literal PGPASSWORD=<your-password-here>`
