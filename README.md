# node-foundationdb memory leak watch

## Setup

Build:

```bash
docker-compose build
```

Init FoundationDB:

```bash
docker-compose up -d foundationdb
docker-compose exec foundationdb fdbcli --exec 'configure new single ssd'
```

Run app:

```bash
docker-compose up app
```

The app will output NodeJS heap usage and process memory usage every 10 seconds.

Teardown:

```bash
docker-compose down -v
```