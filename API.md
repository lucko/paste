<p align="center">
  <img src=".github/banner.svg">
</p>

# API
paste has a simple HTTP API which can be used to read and write pastes programmatically.

> [!IMPORTANT]
> If you are using the official instance of paste (https://pastes.dev), please note the following:
> 
> * You must **provide a  `User-Agent` header** to uniquely identify your application in all requests. This should include the application name and contact information, e.g. `ExampleApp (github.com/ExampleUser/ExampleApp)` or `MyExampleScript (github.com/ExampleUser)`.
> * You must **only upload content when prompted by a user action**, e.g. a button click or command line input. Automated or scheduled uploads are not allowed.
> * An additional **terms of service** applies. In summary:
>   * No Illegal Use *(no illegal, harmful or unlawful content)*
>   * No Malicious Content *(no malware, phishing, personal data without consent, etc.)*
>   * Content Responsibility *(you are responsible for what you post)*
>   * Moderation *(we reserve the right to remove content or block access)*
>   * No Liability *(the service is provided "as is" without warranties)*
>
> Otherwise, please enjoy using the service! :)

### Base URL
The base URL for the 'official' paste instance is: `https://api.pastes.dev/`.

If you are self-hosting, use the base URL of your own instance. With the default Docker Compose setup, this will be `http://localhost:8080/data/`.

## Upload: `POST {BASE URL}/post`

To upload content, send an HTTP `POST` request to `{BASE URL}/post`.

* Include the content in the request body.
* Specify the language with the `Content-Type: text/<language>` header
* If using the official instance, please remember to provide a suitable `User-Agent` header as well. (see above for more details)
* The paste "key" is returned in the `Location` header, and in the response body as a JSON object in the format `{"key": "<key>"}`.**

## Read: `GET {BASE URL}/{key}`

To read content, send an HTTP `GET` request to `{BASE URL}/{key}`.

* Replace `{key}` with the id of the paste.
* The content is returned in the response body.
* The `Content-Type` header is `text/<language>`, where language is the id of the language the paste was saved with.
