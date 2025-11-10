# Site developed using Nuxt and Strapi

## Production

Install Docker and Docker Compose on your system if you haven't already.
```
https://www.docker.com/get-started/
```

Check is Docker is installed correctly by running:

```bash
docker --version
```

Clone this repository to your local machine:

```bash
git clone https://github.com/EnverMT/metalservismarkazi.git
```

Navigate to the project directory:

```bash
cd metalservismarkazi
```

To build and run the production Docker containers for the frontend and backend services, use the following commands:

```bash
docker compose up --build -d
```
or
```bash
podman compose up --build -d
```

Site is avalilable at `http://localhost:3000`.