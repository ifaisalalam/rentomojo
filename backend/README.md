# Backend

Link: [https://api.rentomojo.ml](https://api.rentomojo.ml)


## Usage

### Register

**Request**
```http request
POST /auth/login/

Content-Type: application/json
Accept: application/json

{
  "username": "johndoe",
  "password": "password"
}
```

**Response**
```json
{
    "status": "success",
    "code": "REGISTER_SUCCESS",
    "message": "Account created successfully.",
    "payload": {
        "user": {
            "username": "johndoe",
            "data": {
                "username": "johndoe"
            }
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImlmYWlzYWxhbGFtMjIiLCJkYXRhIjp7InVzZXJuYW1lIjoiaWZhaXNhbGFsYW0yMiIsInBhc3N3b3JkIjoiJDJiJDEwJGdVYnMuSlFDekVLL0JiS3Y0eWExaU96clNWMXV6RmNMSU1JLy5yWHU3ODFKTHoxVXhrTUpDIn0sImlhdCI6MTU2MjY3NTk5NCwibmJmIjoxNTYyNjc1OTk0LCJleHAiOjE1NjI2Nzk1OTQsImlzcyI6Imh0dHBzOi8vYXBpLnJlbnRvbW9qby5tbC8iLCJzdWIiOiJKV1RBdXRoIn0.IdyAINuRqGml21xBQ1Qr8qepsJPp7mgd5oaYxYgr2ww"
    }
}
```

### Login

**Request**
```http request
POST /auth/login

Content-Type: application/json
Accept: application/json

{
  "username": "johndoe",
  "password": "password"
}
```

**Response**
```json
{
    "status": "success",
    "code": "LOGIN_SUCCESS",
    "message": "Login successful.",
    "payload": {
        "user": {
            "username": "johndoe",
            "data": {
                "username": "johndoe"
            },
            "createTime": {
                "_seconds": 1562675994,
                "_nanoseconds": 666758000
            },
            "updateTime": {
                "_seconds": 1562675994,
                "_nanoseconds": 666758000
            }
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImlmYWlzYWxhbGFtMjIiLCJkYXRhIjp7InBhc3N3b3JkIjoiJDJiJDEwJGdVYnMuSlFDekVLL0JiS3Y0eWExaU96clNWMXV6RmNMSU1JLy5yWHU3ODFKTHoxVXhrTUpDIiwidXNlcm5hbWUiOiJpZmFpc2FsYWxhbTIyIn0sImNyZWF0ZVRpbWUiOnsiX3NlY29uZHMiOjE1NjI2NzU5OTQsIl9uYW5vc2Vjb25kcyI6NjY2NzU4MDAwfSwidXBkYXRlVGltZSI6eyJfc2Vjb25kcyI6MTU2MjY3NTk5NCwiX25hbm9zZWNvbmRzIjo2NjY3NTgwMDB9LCJpYXQiOjE1NjI2NzYzMDEsIm5iZiI6MTU2MjY3NjMwMSwiZXhwIjoxNTYyNjc5OTAxLCJpc3MiOiJodHRwczovL2FwaS5yZW50b21vam8ubWwvIiwic3ViIjoiSldUQXV0aCJ9.KeSfgRfCvuw3dcN1qFpLhvrlsYoV9JzLvX_A0J5z4IQ"
    }
}
```

### Get Comments

**Request**
```http request
GET /comments

Content-Type: application/json
Accept: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImlmYWlzYWxhbGFtMjIiLCJkYXRhIjp7InBhc3N3b3JkIjoiJDJiJDEwJGdVYnMuSlFDekVLL0JiS3Y0eWExaU96clNWMXV6RmNMSU1JLy5yWHU3ODFKTHoxVXhrTUpDIiwidXNlcm5hbWUiOiJpZmFpc2FsYWxhbTIyIn0sImNyZWF0ZVRpbWUiOnsiX3NlY29uZHMiOjE1NjI2NzU5OTQsIl9uYW5vc2Vjb25kcyI6NjY2NzU4MDAwfSwidXBkYXRlVGltZSI6eyJfc2Vjb25kcyI6MTU2MjY3NTk5NCwiX25hbm9zZWNvbmRzIjo2NjY3NTgwMDB9LCJpYXQiOjE1NjI2NzYzMDEsIm5iZiI6MTU2MjY3NjMwMSwiZXhwIjoxNTYyNjc5OTAxLCJpc3MiOiJodHRwczovL2FwaS5yZW50b21vam8ubWwvIiwic3ViIjoiSldUQXV0aCJ9.KeSfgRfCvuw3dcN1qFpLhvrlsYoV9JzLvX_A0J5z4IQ
```

**Response**
```json
{
    "status": "success",
    "code": "COMMENTS_RETRIEVED",
    "message": "Comments retrieved successfully.",
    "payload": {
        "comments": [
            {
                "id": "YhM9VGgJbxNK8b5gUZVC",
                "data": {
                    "user": "ifaisalalam",
                    "comment": "This is a comment.",
                    "votes": 0
                },
                "createTime": {
                    "_seconds": 1562409504,
                    "_nanoseconds": 354977000
                },
                "updateTime": {
                    "_seconds": 1562409504,
                    "_nanoseconds": 354977000
                }
            },
            {
                "id": "rCsRVZPJRir6lR9IRe6C",
                "data": {
                    "user": "ifaisalalam",
                    "comment": "This is another comment.",
                    "votes": 0
                },
                "createTime": {
                    "_seconds": 1562409810,
                    "_nanoseconds": 921505000
                },
                "updateTime": {
                    "_seconds": 1562409810,
                    "_nanoseconds": 921505000
                }
            }
        ]
    }
}
```

### Post Comment

**Request**
```http request
POST /comments/add

Content-Type: application/json
Accept: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImlmYWlzYWxhbGFtMjIiLCJkYXRhIjp7InBhc3N3b3JkIjoiJDJiJDEwJGdVYnMuSlFDekVLL0JiS3Y0eWExaU96clNWMXV6RmNMSU1JLy5yWHU3ODFKTHoxVXhrTUpDIiwidXNlcm5hbWUiOiJpZmFpc2FsYWxhbTIyIn0sImNyZWF0ZVRpbWUiOnsiX3NlY29uZHMiOjE1NjI2NzU5OTQsIl9uYW5vc2Vjb25kcyI6NjY2NzU4MDAwfSwidXBkYXRlVGltZSI6eyJfc2Vjb25kcyI6MTU2MjY3NTk5NCwiX25hbm9zZWNvbmRzIjo2NjY3NTgwMDB9LCJpYXQiOjE1NjI2NzYzMDEsIm5iZiI6MTU2MjY3NjMwMSwiZXhwIjoxNTYyNjc5OTAxLCJpc3MiOiJodHRwczovL2FwaS5yZW50b21vam8ubWwvIiwic3ViIjoiSldUQXV0aCJ9.KeSfgRfCvuw3dcN1qFpLhvrlsYoV9JzLvX_A0J5z4IQ

{
    "comment": "This is a comment"
}
```

**Response**
```json
{
    "status": "success",
    "code": "COMMENT_ADDED",
    "message": "Comment added successfully.",
    "payload": {
        "comment": {
            "id": "eZJx4xE0nbMuAkSTlaoK",
            "data": {
                "user": "johndoe",
                "comment": "This is a comment",
                "upvotes": 0,
                "downvotes": 0
            }
        }
    }
}
```

### Upvote Comment

**Request**
```http request
POST /comments/upvote

Content-Type: application/json
Accept: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImlmYWlzYWxhbGFtMjIiLCJkYXRhIjp7InBhc3N3b3JkIjoiJDJiJDEwJGdVYnMuSlFDekVLL0JiS3Y0eWExaU96clNWMXV6RmNMSU1JLy5yWHU3ODFKTHoxVXhrTUpDIiwidXNlcm5hbWUiOiJpZmFpc2FsYWxhbTIyIn0sImNyZWF0ZVRpbWUiOnsiX3NlY29uZHMiOjE1NjI2NzU5OTQsIl9uYW5vc2Vjb25kcyI6NjY2NzU4MDAwfSwidXBkYXRlVGltZSI6eyJfc2Vjb25kcyI6MTU2MjY3NTk5NCwiX25hbm9zZWNvbmRzIjo2NjY3NTgwMDB9LCJpYXQiOjE1NjI2NzYzMDEsIm5iZiI6MTU2MjY3NjMwMSwiZXhwIjoxNTYyNjc5OTAxLCJpc3MiOiJodHRwczovL2FwaS5yZW50b21vam8ubWwvIiwic3ViIjoiSldUQXV0aCJ9.KeSfgRfCvuw3dcN1qFpLhvrlsYoV9JzLvX_A0J5z4IQ

{
    "commentId": "eZJx4xE0nbMuAkSTlaoK"
}

```

**Response**

If the user tries to vote its own comment, an `HTTP Status 403` is returned with the following data.
```json
{
    "status": "error",
    "code": "SELF_VOTE_ERR",
    "message": "You cannot vote your own comment."
}
```

Else, if the user can vote the comment, `HTTP Status 201` is returned with the following data.
```json
{
    "status": "success",
    "code": "UPVOTE_SUCCESS",
    "message": "You upvoted this comment.",
    "payload": {
        "comment": {
            "id": "eZJx4xE0nbMuAkSTlaoK",
            "data": {
                "user": "johndoe",
                "comment": "This is a comment",
                "upvotes": 1,
                "downvotes": 0
            }
        }
    }
}
```

### Downvote Comment

**Request**
```http request
POST /comments/downvote

Content-Type: application/json
Accept: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImlmYWlzYWxhbGFtMjIiLCJkYXRhIjp7InBhc3N3b3JkIjoiJDJiJDEwJGdVYnMuSlFDekVLL0JiS3Y0eWExaU96clNWMXV6RmNMSU1JLy5yWHU3ODFKTHoxVXhrTUpDIiwidXNlcm5hbWUiOiJpZmFpc2FsYWxhbTIyIn0sImNyZWF0ZVRpbWUiOnsiX3NlY29uZHMiOjE1NjI2NzU5OTQsIl9uYW5vc2Vjb25kcyI6NjY2NzU4MDAwfSwidXBkYXRlVGltZSI6eyJfc2Vjb25kcyI6MTU2MjY3NTk5NCwiX25hbm9zZWNvbmRzIjo2NjY3NTgwMDB9LCJpYXQiOjE1NjI2NzYzMDEsIm5iZiI6MTU2MjY3NjMwMSwiZXhwIjoxNTYyNjc5OTAxLCJpc3MiOiJodHRwczovL2FwaS5yZW50b21vam8ubWwvIiwic3ViIjoiSldUQXV0aCJ9.KeSfgRfCvuw3dcN1qFpLhvrlsYoV9JzLvX_A0J5z4IQ

{
    "commentId": "eZJx4xE0nbMuAkSTlaoK"
}

```

**Response**

If the user tries to vote its own comment, an `HTTP Status 403` is returned with the following data.
```json
{
    "status": "error",
    "code": "SELF_VOTE_ERR",
    "message": "You cannot vote your own comment."
}
```

Else, if the user can vote the comment, `HTTP Status 201` is returned with the following data.
```json
{
    "status": "success",
    "code": "DOWNVOTE_SUCCESS",
    "message": "You downvoted this comment.",
    "payload": {
        "comment": {
            "id": "eZJx4xE0nbMuAkSTlaoK",
            "data": {
                "user": "johndoe",
                "comment": "This is a comment",
                "upvotes": 0,
                "downvotes": 1
            }
        }
    }
}
```
