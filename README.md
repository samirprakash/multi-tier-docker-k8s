# Multi Tier Docker k8s Application

#### Architecture

![alt project architecture](./screenshots/multi-tier-docker-k8s-setup.png)

##### Create PG Secret

- `kubectl create secret generic postgres-password --from-literal PGPASSWORD=<your-password-here>`

##### ingress-nginx controller

- Mandatory Command `kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/static/mandatory.yaml`

- Docker for Mac `kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/static/provider/cloud-generic.yaml`
