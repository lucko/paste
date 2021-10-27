<h1 align="center">📋 paste</h1>

**paste is a simple web app for writing & sharing code.** It's my own take on conventional pastebin sites like _pastebin.com_ or _hastebin_.

The frontend _(this repository)_ is written using the React framework. The backend data storage is handled by a separate web service called [bytebin](https://github.com/lucko/bytebin).

The user-interface is quite simple; it supports syntax highlighting, automatic indentation, many supported languages, themes, zooming in/out, linking to specific lines or sections, and more!

<p align="center">
  <img src="https://i.imgur.com/03rBijj.gif">
</p>

## Usage

I host a public instance of paste at [paste.lucko.me](https://paste.lucko.me). Please feel free to use it to share code/configs/whatever!

However please note that the (very-non-legally worded) [terms of service](https://github.com/lucko/bytebin#public-instances) for my public bytebin instance apply here too. If you come across any content which is illegal or infringes on copyright, please [get in touch](https://lucko.me/contact) and let me know so I can remove it.

Uploaded content is retained for 30 days then deleted.

### Host your own

If you want to host your own paste, first you need to compile it:

```bash
git clone https://github.com/lucko/paste
yarn install
yarn build

# or run the following instead of 'yarn build' to start a webserver for testing/development
yarn start
```

You can then follow the [create-react-app deployment documentation](https://create-react-app.dev/docs/deployment/) for how to host the build output. I personally recommend deploying to the cloud using a service like Netlify instead of hosting on your own webserver.

If you really want to self-host (including the bytebin data storage part), I suggest using Docker:

```bash
git clone https://github.com/lucko/paste
docker compose up -d
```

You should then (hopefully!) be able to access the application at `http://localhost:8080/`.

## API

paste uses [bytebin](https://github.com/lucko/bytebin) for data storage.

As a result, you can use the [bytebin API](https://github.com/lucko/bytebin#api-usage) to submit/read content programatically.

To set the language of a paste, use the `Content-Type` header with value `text/<language>` (e.g. `Content-Type: text/yaml` for a _.yml_ file).
