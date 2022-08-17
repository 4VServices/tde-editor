# tde-editor

A TDE Template editor

## Overview of TDE

Template-Driven Extraction lets developers build a template to specify information to be read from target documents and
used to populate relational-style views, semantic triples, or both.

[Tutorial](https://developer.marklogic.com/learn/template-driven-extraction/)

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
