# TODO LIST API

## Description

Simple api to a todo list

### Environment

- Database -> MongoDB (mongoose)
- Api -> express app
- Middleweares -> helmet, cors, body-parser, morgan

### Entities 

Every record should have 

- [x] Created At: Datetime
- [x] Updated At: Datetime


- [x] user
    - [x] _id
    - [x] username


- [x] todo
    - [x] _id
    - [x] userId  
    - [x] marked_date : string
    - [x] title : string
    - [x] description : string
    - [x] completed : boolean




