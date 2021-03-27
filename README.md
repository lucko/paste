<h3 align="center"><img src="https://i.imgur.com/Aifb3lU.png"></h3>
<h1 align="center">paste</h1>

paste is a simple, "code friendly" web frontend for [bytebin](https://github.com/lucko/bytebin).

It is written in React using [react-simple-code-editor](https://github.com/satya164/react-simple-code-editor) and [Prism](https://github.com/PrismJS/prism).

### Usage
I host a public instance of paste at [paste.lucko.me](https://paste.lucko.me).

Please feel free to use it to share code/configs/whatever! However note the (very-non-legally worded) [terms of service](https://github.com/lucko/bytebin#public-instances) for bytebin apply.

If you come across any content which is illegal or infringes on copyright, please [get in touch](https://lucko.me/contact) and let me know so I can remove it.

Uploaded content is retained for 30 days then deleted.

### Host your own
If you want to host your own paste:

```bash
git clone https://github.com/lucko/paste
yarn install

yarn start # to start a dev instance locally
yarn build # to build for production
```

### API
paste uses [bytebin](https://github.com/lucko/bytebin) for data storage.

As a result, you can use the [bytebin API](https://github.com/lucko/bytebin#api-usage) to submit/read content programatically.

To set the language of a paste, use the `Content-Type` header with value `text/<language>` (e.g. `Content-Type: text/yaml` for a .yml file).