# tde-editor

A TDE Template editor

## Overview of TDE

Template-Driven Extraction lets developers build a template to specify information to be read from target documents and
used to populate relational-style views, semantic triples, or both.

[Tutorial](https://developer.marklogic.com/learn/template-driven-extraction/)

## Deploying the Editor

Note that the editor is intended for use in local environments. Making changes to a template and inserting it will
cause MarkLogic to reindex. You might want this, but be conscious of that in environments that have a significant
amount of data.

### Prepare to deploy

You'll do these steps once.

1. Clone this repo (https://github.com/4VServices/tde-editor).
2. Review the properties in marklogic/gradle.properties. If needed create a gradle-{env}.properties file to override
   them. (Example: you want to use a different port in your local laptop. Create marklogic/gradle-local.properties,
   copy the `appPort` property, and give it the new value.)
3. `cd ui`, then `npm install`. This will download the dependencies used by the UI.
4. Create a file named `.env` inside the `ui` directory, copy the content from `.env.example` and change the values
   if necessary
5. Still from the `ui` directory, run `npm run build`. This will gather the files needed for the UI and get them ready
   for MarkLogic to use.

### Deploy to MarkLogic

The TDE Editor is an application that runs in MarkLogic. The default configuration will deploy it with an app server
using port 8003. If you want to deploy to multiple environemnts (or different Docker containers on your laptop), do
these steps once for each MarkLogic environment.

Starting at the project root directory:

1. `cd marklogic`
2. `./gradlew mlDeploy -i -PenvironmentName=local`
3. Point your browser to http://localhost:8003.

Note that the `build.ps1` script in the project root will build the UI files and deploy them to your local MarkLogic.

## Using the Editor

After deploying, the editor is available at http://localhost:8003.

The brief version:

- Select a content database. This database should have some content you want to extract from.
- Optionally select a template from the database. If you don't select an existing one, then you're working on a new
  one.
- The Insert button will insert the template into the schemas database associated with your selected content database.
- The Export button will let you save the template to your local file system.
- The Validation button will check whether your template is valid.
- The Extract button will use your template to extract data from the Sample Documents you have selected and display
  the results in the form.

### Permissions

The TDE Editor comes with two roles: a "nobody" role and a "standard" role. The "nobody" role has just enough
privileges and permissions to get you to the login screen. To use the editor, you will need a user that has at least
two other roles:

1. `tde-editor-standard-role`. Having this role will grant you access to the TDE Template Editor's functionality.
2. A role that grants access to the TDE templates and document you want to work with. This will be specific to the
   application you are working on. At minimum, you will need `read` and `update` access to any existing templates (or
   sufficient privileges to create new ones). You will also need `read` permissions for any documents in your content
   database that you'd like to test your templates against.

## Developers

This application is entirely hosted in MarkLogic with no middle tier. The UI code needs to brought into MarkLogic to
be hosted. Here's the process for doing so.

### Initial Setup

You'll need a MarkLogic instance. The TDE Template Editor's default port is 8003, so either make sure that's available
or create a marklogic/gradle-local.properties file with an `appPort` property identifying the port you want to use
instead.

You can create a Docker container holding MarkLogic using the following command or you can install MarkLogic locally.

```
docker run -d --name=tde-editor -p 8000-8020:8000-8020 \
  -e MARKLOGIC_INIT=true \
  -e MARKLOGIC_ADMIN_USERNAME={insert admin username} \
  -e MARKLOGIC_ADMIN_PASSWORD={insert admin password} \
  marklogicdb/marklogic-db:10.0-9.1-centos-1.0.0-ea4
```

Once MarkLogic is ready, deploy the application:

```
cd marklogic
./gradlew mlDeploy -i
```

To load some sample data and a sample TDE Template, add `mlDataLoadingEnabled=true` to your gradle-local.properties
file, then run `./gradlew mlLoadData`. Note that sample data will go into your Documents database.

Run `./gradlew mlLoadSchemas` to load the sample TDE Template. This will go into your Schemas database.

### Deploying the UI

Because MarkLogic is hosting the UI, we need to first build the files, then deploy them to MarkLogic. The `build.ps1`
script does this.

### Running the application

Once the above steps have been done, you point your browser to http://localhost:8003 (change the port if your overrode
in your gradle-local.properties file).

### Example Project

For a working example of how to use the TDE Editor, deploy the examples/soccer project. You can then log into the TDE
Editor as "soccer-admin" (password "soccer-admin") and you'll be able to work with the sample template defined in that
project.

### Alternative Deployment

The build-and-deploy cycle is a bit long when doing UI development. To simplify, we run the UI from the UI directory
and have it talk to MarkLogic. The challenge with this is that we run into CORS problems, since the UI needs to talk
directly to MarkLogic, which is not where the browser gets the code from.

**Note: This plugin is a security risk and will interfere with regular browsing. You should only use it while doing
this development, then disable it.**

There is a Chrome plugin called "Allow CORS: Access-Control-Allow-Origin" that gets past this problem. To use it,
first install it in your browser. You should now see it by clicking on the Extension icon in the upper right. Click on
the extension, which will bring up a small panel. On the left side of the panel, make sure the extension is toggled on.
You may need to click on the "C..." icon on the left side of the panel.
