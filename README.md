# tde-editor

A TDE Template editor

## Using the Editor

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

Because MarkLogic is hosting the UI, we need to first build the files, then deploy them to MarkLogic.

```
cd ui/tde-editor/
npm run build
cd ../../marklogic
./gradlew mlLoadModules
```

You may find it helpful to have a terminal in the ui/tde-editor directory to do the build and a separate one in the
marklogic directory to load the modules.

### Running the application

Once the above steps have been done, you point your browser to http://localhost:8003 (change the port if your overrode
in your gradle-local.properties file).
