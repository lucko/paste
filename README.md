<p align="center">
  <img src=".github/banner.svg">
</p>

**paste is a simple web app for writing & sharing code.** It's my own take on conventional pastebin sites like _pastebin.com_ or _hastebin_.

Anyone can use paste! The official/public instance can be accessed using the endpoints listed below, but you can also [host your own](#self-hosting) if you like!

##### 1) In a Web Browser
Just go to https://pastes.dev!

##### 2) From the Command Line
You can submit content most easily using [curl](https://curl.se/docs/manpage.html).

```shell
# Upload the contents of a file
> curl -T example.txt https://api.pastes.dev/post

# Upload the contents of a file and specify the language
> curl -T example.yml -H "Content-Type: text/yaml" https://api.pastes.dev/post

# Pipe in some output from any command
> echo "Hello world" | curl -T - https://api.pastes.dev/post
```

<details>
  <summary>If you don't want to do so much typing, you can create a shorter <b>alias</b>.</summary>
  
  ```bash
  # Add this to the end of `~/.bashrc` and run 'source ~/.bashrc'
  paste() {
    curl -T $1 https://api.pastes.dev/post
  }
  ```

  then...

  ```shell
  # Upload the contents of a file
  > paste example.txt

  # Pipe in some output from any command
  > echo "Hello!" | paste -
  ```
</details>

##### 3) From Code / Scripts
Please see the [API Documentation](/API.md). :)

___

### About
The frontend _(this repository)_ is written using the React framework. The backend data storage is handled by a separate web service called [bytebin](https://github.com/lucko/bytebin).

The user-interface is based on the [Monaco Editor](https://microsoft.github.io/monaco-editor/), the engine behind the popular Visual Studio Code text editor. It's quite simple; it supports syntax highlighting, automatic indentation, many supported languages, themes, zooming in/out, linking to specific lines or sections, and more!

___

### Self-hosting

The easiest way to self-host is using Docker (& Docker Compose). You can run the following commands to get started:

```bash
git clone https://github.com/lucko/paste
cd paste
docker compose up -d
```

You should then (hopefully!) be able to access the application at `http://localhost:8080/`.
