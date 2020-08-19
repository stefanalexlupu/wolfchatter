# Wolfchatter

This chat is not an ordinary one, it’s created on a map, where users can click
to add a pin on the map and start a conversation with anyone.

## Architecture

You can find information regarding the application design as well as technology
choices by [visiting this page](https://github.com/stefanalexlupu/wolfchatter/tree/master/documentation)

## Running the project

The project is split into two parts: the client and the server.

### Starting the server

From the server folder, run the following commands:

```
npm install
npm run start
```

You should see the following message in the console:

```
listening on port 8081
```

To start the server in development mode, run

```
npm run dev
```

### Starting the client app

From the client folder, run the following commands:

```
npm install
npm run build
```

Then you can serve the app from the generated dist folder.

To launch the client app in development mode, run

```
npm run serve
```

## ✨ Future improvements

### Leaving a room

As a user I want to be able to leave a room without necessarily creating a new
one.

### Suggesting rooms close to you

As a user I want to get suggestions on rooms that are close to me and maybe join
one of them.

### Curating rooms

As a user it is easy to create a room by accident. Clicking on the map should
bring up a dialogue for confirmation.

As a user it would be useful to create rooms with a name, rather than generating
the name on an index basis.

As a user it would be useful to see the coordinates of the room (or even the
country that the room is situated in). This way it would be easyer to relate.
