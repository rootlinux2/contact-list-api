# Contact List API

This project is a simple NodeJS + Express API

## Get starter


### Clone the repo
```sh
$ git clone project URL
```

### Install dependencies
Once it is cloned you should install dependencies

```sh
$ cd contact-list-api
$ yarn
```

### Start the API

```sh
$ yarn start
```

### To get access
list all contacts

```sh
$ curl --location --request GET 'http://localhost:3002/api/contact'
```
To create new contact
```sh
$ curl --location --request POST 'http://localhost:3002/api/contact' \
        --header 'Content-Type: application/json' \
        --data-raw '{
            "name": "Jhon Smith",
            "address": "Miami, FL",
            "phone": "+1 888 546 232 541",
            "email": "jhon@gmail.com"
        }'

```