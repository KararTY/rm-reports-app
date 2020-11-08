# Repair Manual Form

1. Watch video.
2. Fill out form.
3. Upload
  - To Github as a PR.
  - Or get formatted MediaWiki text to copypaste into the wiki.

## Features

* [x] Fill out a form.
* [x] Allow the forms to be saved on the client (localstorage).
* [x] Allow people to upload forms as a Github PR to `repair-manual/forms`.
  1. [x] UpdateOrCreate fork of `repair-manual/forms`.
  2. [x] Create a separate branch (or look for branch with same video id name).
  3. [x] Upload current project to new branch in repository.
  4. [x] Create a PR from branch to upstream.
* [x] Allow people to download forms from Github repository `repair-manual/forms`.
* [x] Format forms with MediaWiki formatting. **NEEDS MORE WORK**

## Available Scripts

### npm start

Runs the app in the development mode.

The page will reload if you make edits.
You will also see any lint errors in the console.

### npm run build

Builds the app for production to the `dist/` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

## Directives

In case you need to add a directive like `classMap` you should add the extension to the import:

```
import { classMap } from "lit-html/directives/class-map.js";
```
