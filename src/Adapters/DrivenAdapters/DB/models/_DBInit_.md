Copy and paste the following sql code in your psql program, to initialise the DB

# Step 1: Create the DB

```
CREATE DATABASE chat_app;
```

# Step 2: Bootsrap the Tables

```
CREATE TABLE IF NOT EXISTS users (
  userId TEXT PRIMARY KEY NOT NULL UNIQUE,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  isConfirmed BOOLEAN NOT NULL DEFAULT FALSE,
  createdAt DATE NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS messages (
  messageId TEXT PRIMARY KEY NOT NULL UNIQUE,
  content TEXT NOT NULL,
  receiverId TEXT NOT NULL,
  senderId TEXT NOT NULL,
  createdAt DATE NOT NULL DEFAULT NOW(),

  FOREIGN KEY (receiver_id)
    REFERENCES users (user_id)
    ON DELETE CASCADE,

  FOREIGN KEY (sender_id)
    REFERENCES users (user_id)
    ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS verification_codes (
  email TEXT NOT NULL UNIQUE,
  code INT NOT NULL,
  createdAt DATE NOT NULL DEFAULT NOW(),

  FOREIGN KEY (email)
    REFERENCES users (email)
    ON DELETE CASCADE
);
```
