
# Simple Health Declaration Form




## API Reference

#### Get all users

```http
  GET http://localhost:3001/user/
```

| Parameter | Type     |
| :-------- | :------- |
| `id` | `integer` | 
| `Email` | `string` |
| `Name` | `string` | 
| `Password` | `string` |

#### Register User

```http
  POST http://localhost:3001/user/register
```

| Parameter | Type     |
| :-------- | :------- |
| `Email` | `string` | 
| `Name` | `string` |
| `Password` | `string` | 


#### User Login

```http
  POST http://localhost:3001/user/login
```

| Parameter | Type     |
| :-------- | :------- |
| `Email` | `string` | 
| `Password` | `string` |


#### Get all Records

```http
  GET http://localhost:3001/record/
```

| Parameter | Type     |
| :-------- | :------- |
| `Name` | `string` | 
| `Temperature` | `float` |
| `Symptoms` | `string` | 
| `Contact` | `boolean` |

#### Insert Record

```http
  POST http://localhost:3001/record/
```

| Parameter | Type     |
| :-------- | :------- |
| `Name` | `string` | 
| `Temperature` | `string` |
| `Symptoms` | `string` | 
| `Contact` | `boolean` |





## Acknowledgements

 - Register then login in order to add record
 - Added one to many relationship for users and their records


## Run Locally


Go to the server directory

```bash
  cd server
```


Go to the client directory

```bash
  cd client
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run
```


## Database Information

- MySQL Workbench
- APP_PORT = 3001
- DB_HOST = "localhost"
- DB_PORT = 3306
- DB_USER = "admin"
- DB_PWD = "admin123"
- DB_NAME = "healthrecords"