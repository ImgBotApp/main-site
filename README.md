# JohnRitterbush.com

The basic building blocks for my site. This doc needs work and testing but this is the overview.

## Requirements

1. `npm` [Installing Node.js and updating npm | npm Documentation](https://docs.npmjs.com/getting-started/installing-node)
2. `bower`: [Bower](http://bower.io/#install-bower)

## Build

1. Copy the `gulp/example.safe-words.json` to `gulp/safe-words.json` and add in your [TinyPNG – Developer API](https://tinypng.com/developers) key.

2. Load dev dependencies 

```
npm install
```

3. Load front-end dependencies

```
gulp bower
```

4. Build it up

```
gulp build
```

