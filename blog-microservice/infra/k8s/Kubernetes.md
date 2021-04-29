Eu decidi fazer tudo em arquivos separados para melhor entendimento.

Mas pode-se também fazer tudo em um arquivo junto, separado somente por cada serviço

Por exemplo:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: posts-depl
spec:
  replicas: 1
  selector:
    matchLabels:
      app: posts
  template:
    metadata:
      labels:
        app: posts
    spec:
      containers:
        - name: posts
          image: darkisda/posts
---
apiVersion: v1
kind: Service
metadata:
  name: posts-clusterip-srv
spec:
  selector:
    app: posts
  ports:
    - name: posts
      protocol: TCP
      port: 4000
      targetPort: 4000
```

Que o próprio Kubernetes entende como Pods separados graças ao `---`