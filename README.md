## Requirements

- docker
- make sure to open project folder in terminal

## How to run

1. the command below will trigger docker to build the image
   `docker build -t tarek/country-numbers-frontend .`
2. to start the image and expose port 3000 on localhost run this command
   `docker run --name tarek-country-numbers-frontend -d -p 3000:3000 tarek/country-numbers-frontend`

---

## Single command

`docker build -t tarek/country-numbers-frontend . && docker run --name tarek-country-numbers-frontend -d -p 3000:3000 tarek/country-numbers-frontend`

**Notes:**

- To stop the container run this `docker stop <container-id>`
- I haven't added .env to .gitignore to simplify the run process for the reviewer in real world projects we include .env.example only
