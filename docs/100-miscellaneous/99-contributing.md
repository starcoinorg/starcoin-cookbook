# Contribution Guide

## How to Contribute

### 1. Clone the Cookbook

Fork the Starcoin Cookbook repo to make a copy of this cookbook in your account. Then **clone** that repo to your development environment and navigate to the local repo.

```bash
git clone git@github.com:your-username/starcoin-cookbook.git
cd starcoin-cookbook
```

### 2. Installing Packages

Node.js and yarn are required to build this cookbook, read the [yarn installation page](https://yarnpkg.com/getting-started/install) for details.

Execute the following command in the project root to install the packages and dependencies.

```bash
$ yarn
```

### 3. Running the Development Server

```bash
$ yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### 4. Build

This command generates static content into the `/build` directory and can be served using any static contents hosting service.

```bash
$ yarn build
```

Then run serve to serving build directory at http://localhost:3000/starcoin-cookbook/

```bash
$ yarn serve
```

## Guidelines

### File Structure Guidelines

1. A numerical prefix is required in the directory name and file, e.g., `01-build.md`, which indicates the order of the document in the sidebar.
2. `kebab-case` naming convention is used in directory and file names.
3. The `README.md` in each directory is the front page of the directory.
4. The `_category_.yaml` is the configuration file for a directory, in which the `label` property is the title of this directory showing in the sidebar.
5. The default documents are in English, translations can be found in `i18n/<language-code>/docusaurus-plugin-content-docs/current`. Translations should use the same file name as the English docs.

### Document Style Guidelines

:::note

The Chinese version is following additional document conventions, read the Chinese document style for details.

:::

## FAQ

1. How to translate a section (directory)?

  Adding Chinese translation for example. Run the following command after adding a new section (directory):

  ```bash
  $ yarn write-translations --locale zh
  ```

  Changes are made to `i18n/zh/docusaurus-plugin-content-docs/current.json`, and new directory name is added. Editing the file to add translation.

  Change `zh` to the corresponding language code for other languages.
