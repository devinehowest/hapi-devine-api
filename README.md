# hapi-devine-api

## Description

🔧 This Hapi plugin generates API routes based on Mongoose schemas

**!!! USE THIS IN COMBINATION WITH 'hapi-devine-mongodb' !!!**

## Install hapi-devine-api

```bash
yarn add hapi-devine-api
```

## Usage

Register it after `hapi-devine-mongodb`

```js

server.register({

  register: require(`hapi-devine-api`)

}, pluginHandler);

```

add `api: true` to your schema exports, see `hapi-devine-mongodb`

```js

const schema = {
  // ...
}

module.export = {
  schema,
  api: true
}

```

## License

MIT
