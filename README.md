*# Ollamabalancer

Ollamabalancer is a load balancer for ollama servers, providing a single endpoint proxy to handle multiple servers on the backend using a single endpoint. It allows you to randomly pick servers and use a network proxy if desired. The system uses a MySQL database to store server information and proxy details, including credentials.

## Environment Variables

- **IP**: IP address for the server (default: `0.0.0.0`)
- **PORT**: Port number for the server (default: `8080`)
- **DB_HOST**: Hostname or IP of the MySQL database (default: `localhost`)
- **DB_PORT**: Port number for the MySQL database (default: `3306`)
- **DB_USERNAME**: Username for accessing the MySQL database (default: `root`)
- **DB_PASSWORD**: Password for accessing the MySQL database (default: `root`)
- **DB_DATABASE**: Name of the database to use in MySQL (default: `ollamaServers`)

## API Endpoints

### Proxy Controller

#### Add a Proxy
- **Endpoint**: `/proxy/addProxy`
- **Method**: POST
- **Body**:
  ```json
  {
    "ip": "string",
    "port": number,
    "protocol": "string" (default: "http"),
    "name": "string",
    "status": boolean (default: true),
    "userName": "string" (optional),
    "password": "string" (optional)
  }
  ```
- **Response**: `true`

#### Get All Proxies
- **Endpoint**: `/proxy/allProxies`
- **Method**: GET
- **Response**:
  ```json
  [
    {
      "id": number,
      "ip": string,
      "port": number,
      "protocol": string,
      "name": string,
      "status": boolean,
      "userName": string (optional),
      "password": string (optional)
    }
  ]
  ```

### Servers Controller

#### Get a Random Server
- **Endpoint**: `/servers/getServer`
- **Method**: GET
- **Query Parameters**:
    - `models`: string
    - `size`: number
    - `proxy`: number : the database id of the proxy to use
- **Response**: `string` (server ID)

#### ollama requests handler
- **Endpoint**: `/servers/ollama/<server_id>/*`
- **Method**: Any HTTP method
- **Path Parameters**: `*` (path after `/servers/ollama/<server_id>`)
- **Query Parameters**:
    - `serverId`: string (optional) : can be used instead of the path server_id if possible
- **Headers**:
    - `content-type`: string
- **Body**: Depends on the content type (`application/json`, `application/x-www-form-urlencoded`, or text/plain)
- **Response**: Response from the target server

## Security Notes

Credentials are stored in plain text within the MySQL database. This poses a security risk and should be addressed by implementing proper encryption for sensitive data.
