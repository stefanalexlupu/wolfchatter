## Architecture

### Entity relationship diagram

Description:

> “As a user I want to click on a map to write multiple text messages. When I
> click on the map a new chatroom is created at that position using the latitude
> and longitude coordinates. Other users can click on that pin and enter the
> chatroom where they can see previous messages and create new messages.“

![ERD Diagram](./documentation/Wolfchatter-ERD.png)

### Components

```
App
+-- Map
|   +-- [Marker]
+-- Chatroom
|   +-- [Message]
|   +-- MessageDialogue
```

App
* Root of the application

Map
* Component representing the map and all related functionality, such as:
  * loading the tiles
  * initial state of the map
  * map interaction (clicking, zooming, etc.)
  * markers (?) 

Marker
* Representation of location on the map
* Corresponding link to a chatroom
* Depending on library implementation, might be configurable as nested
component inside the map copmponent or not.

Chatroom
* Isolate chat widget
* Data (map from application store):
  * Current room name
  * Messages
* States:
  * **No room selected**: display message to start a room
  * **A room is selected**: display messages from the current room

Message
* Reusable component for holding a single message
* Data (props):
  * message date
  * user name
  * message

MessageDialogue
* Component for representing new message form
* Separate form logic from other components
* Data (form model):
  * user name
  * message

Use a state management module such as `vuex` to manage the data shared across
sibling components, for example:

> When a user clicks on the map, load the chatroom history in the store for the
> location selected by the user.

### Communication

1. Use a REST API in order to:
    * GET all available chatrooms (with coordinates)
    * GET chatroom messages (when user selects one)
2. Use Socket.io to perform realtime message delivery
