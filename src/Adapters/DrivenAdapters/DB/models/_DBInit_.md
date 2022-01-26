Copy and paste the following sql code in your psql program, to initialise the DB

# Step 1: Create the DB

```
CREATE DATABASE chat_app;
```

# Step 2: Bootsrap the Tables

```
CREATE TABLE IF NOT EXISTS users (
  user_id TEXT PRIMARY KEY NOT NULL UNIQUE,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  is_confirmed BOOLEAN NOT NULL DEFAULT FALSE,
  created_at DATE NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS messages (
  message_id TEXT PRIMARY KEY NOT NULL UNIQUE,
  content TEXT NOT NULL,
  receiver_id TEXT NOT NULL,
  sender_id TEXT NOT NULL,
  created_at DATE NOT NULL DEFAULT NOW(),

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
  created_at DATE NOT NULL DEFAULT NOW(),

  FOREIGN KEY (email)
    REFERENCES users (email)
    ON DELETE CASCADE
);
```
