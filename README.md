# Lingo - Language Learning App 
# Instruction to running the app

## Initial conditions

    For proper running of the app the following is needed: **Node.js (v21.7.1)**, **MongoDB (v7.0.7)**, **Docker** oraz **Mailpit**.

    Mailpit installation in Docker:
    ```console
    docker run -d \
    --restart unless-stopped \
    --name=mailpit \
    -p 8025:8025 \
    -p 1025:1025 \
    axllent/mailpit
    ```

    After that, it is possible now to move to next steps.

### Frontend

    For the initial frontend app installation, it is necessary to install all required NPM packages.

    Będąc w głównym folderze aplikacji, przejść do folderu pt. "frontend", zainstalować pakiety, a następnie uruchomić serwis:
    ```console
    cd frontend
    npm i
    npm run dev
    ```

    After the initial npm package install, it is not necessary to run `npm i` command anymore.

### Backend

    For the initial backend app installation, it is necessary to install all required NPM packages.
    
    *Wymagane uruchomienie serwera SMTP Mailpit*

    Będąc w głównym folderze aplikacji, przejść do folderu pt. "backend", zainstalować pakiety, a następnie uruchomić serwis:
    ```console
    cd backend
    npm i
    npm start
    ```

    After the initial npm package install, it is not necessary to run `npm i` command anymore.

Mailpit:
The MIT License (MIT)
Copyright (c) 2022-Now() Ralph Slooten

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
