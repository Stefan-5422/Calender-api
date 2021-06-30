# Calender-api
## This is the API for a simple calender app
---
# Calender Endpoints
## API Doc V1
---
# GET /api/entries/
## Description
	Gets all entries of the current user
## Returns
	A json object with the entries of the current user
	name: The name of the entry
	description: (optional) The description of the entire
	date: The date of the entry (string from Data.parse())
	id: a unique identifier
## Auth
	Valid Bearer token

## Codes
	200: Succes
	403: No valid session
---
# POST /api/entries/
## Description
	Adds a new entry to the current user
## Returns
	A json object with any errors that occured
## Parameters
	name: The name of the entry
	description: (optional) The description of the entire
	date: The date of the entry
## Auth
	Valid Bearer token
## Codes
	201: Succes
	400: Invalid post data
	403: No valid session
---
# PUT /api/entries/{id}
## Description
	Updates the given entry
## Returns
	A json object with any errors that occured
## Parameters
	id: The id of the entry to update
	At least one of these parameteres need to be included:
		name: The name of the entry
		description: (optional) The description of the entire
		date: The date of the entry
## Auth
	Valid Bearer token and the user needs to be part of the event
## Codes
	204: Succes
	400: Invalid post data
	403: No valid session
	404: entry was not found
	405: User is not added to the entry

# User Endpoints
---
# GET /api/users/settings
## Description
    Gets all the users configuration
## Returns
    A json object with the users configuration
## Auth
    Valid Bearer token
## Codes
    200: Succes 
    403: Invalid session
---
# POST /api/users/auth/
## Description
	Authenticates a already existing user
## Returns
	A json object with any errors and the auth token
	errors: ...
	auth:
		acces_token: The token
		token_type: The string "bearer"
## Parameters
	username: Username
	password: Password not hashed
## Codes
	200: Succes
	400: Invalid post data
	401: Login Failed

# POST /api/users/register/
## Description
	Creates a new user (does not authenticate)
## Returns
	A json object with any errors
## Parameters
		username: Username
		password: Password not hashed
## Codes
	201: Succes
	400: Invalid post data
	409: Username was not unique
---
# PUT /api/user/
## Description
	Updates the given user
## Returns
	A json object with any errors that occured
## Parameters
	At least one of these parameteres need to be included:
		username: The name of the user
		password: The password of the user
## Auth
	Valid Bearer token 
## Codes
	204: Succes
	400: Invalid post data
	403: No valid session

# File endpoints
---
# Get /api/file/{id}
## Description
	Returns the file with the given ID
## Parameters
	id: The id of the requested asset
## Returns
	The asset that has been requested
## Auth
	Valid Bearer token
## Codes
	200: Success
	403: No valid session
	404: Asset not foud 

---
# POST /api/file/upload/
## Description
	Uploads the given file to the server
## Returns
	A json object with any errors that occoured
	errors: ...
	asset: 
		id: unique identifier
## Parameters
	file: The file which is to be uploaded to the server
## Auth
	Valid Bearer token
## Codes
	201: Succes
	400: Invalid post data
	403: No valid session