-- Creates users table if it doesn't exists --
CREATE TABLE IF NOT EXISTS users(
	id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	username VARCHAR(50) NOT NULL,
	email VARCHAR(75) NOT NULL UNIQUE,
	name TEXT,
	password_hash TEXT NOT NULL,
	description VARCHAR(250),
	avatar_url text,
	banner_url text,
	created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
	deleted_at TIMESTAMPTZ DEFAULT NULL
);

-- Creates posts table if it doesn't exists --
CREATE TABLE IF NOT EXISTS posts(
	id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	user_id INT NOT NULL REFERENCES users(id),
	content VARCHAR(2000) NOT NULL,
	created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
	deleted_at TIMESTAMPTZ DEFAULT NULL
);

-- Creates post_likes table if it doesn't exists --
CREATE TABLE IF NOT EXISTS post_likes(
	user_id INT NOT NULL REFERENCES users(id),
	post_id INT NOT NULL REFERENCES posts(id),
	created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
	deleted_at TIMESTAMPTZ DEFAULT NULL
);

-- Index which ensures user_id, post_id & deleted_at combination at post_likes table is unique --
-- Preventing duplicated records to be created --
CREATE UNIQUE INDEX idx_liked_post 
ON post_likes (user_id, post_id, deleted_at);

-- Creates saved_posts table if it doesn't exists --
CREATE TABLE IF NOT EXISTS saved_posts(
	user_id INT NOT NULL REFERENCES users(id),
	post_id INT NOT NULL REFERENCES posts(id),
	saved_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
	unsaved_at TIMESTAMPTZ DEFAULT NULL
);

-- Index which makes sure user_id, post_id & unsaved_at combination at saved_posts is unique --
CREATE UNIQUE INDEX idx_saved_post ON saved_posts (user_id, post_id, unsaved_at);

-- Creates comments table if it doesn't exists --
CREATE TABLE IF NOT EXISTS comments(
	id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	parent_id INT NOT NULL REFERENCES posts(id),
	user_id INT NOT NULL REFERENCES users(id),
	content VARCHAR(1000) NOT NULL,
	created_at TIMESTAMPTZ DEFAULT NOW(),
	deleted_at TIMESTAMPTZ DEFAULT NULL
);

-- Creates comment_likes table if it doesn't exists --
CREATE TABLE IF NOT EXISTS comment_likes(
	user_id INT NOT NULL REFERENCES users(id),
	comment_id INT NOT NULL REFERENCES comments(id),
	created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
	deleted_at TIMESTAMPTZ DEFAULT NULL
);

-- Index which ensures user_id, comment_id & deleted_at combination at comment_likes tables is unique --
CREATE UNIQUE INDEX idx_liked_comment 
ON comment_likes (user_id, comment_id, deleted_at);

-- Create follows table if it doesn't exists --
CREATE TABLE IF NOT EXISTS follows(
	id_following INT NOT NULL REFERENCES users(id),
	id_follower INT NOT NULL REFERENCES users(id),
	created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
	deleted_at TIMESTAMPTZ DEFAULT NULL
);

-- Index which makes id_following, id_follower & deleted_at combination unique --
-- Preventing duplicated records --
CREATE UNIQUE INDEX idx_unique_follows 
ON follows (id_following, id_follower, deleted_at);

-- Add a constraint that checks an user is not following himself --
ALTER TABLE follows
ADD CONSTRAINT check_follows_not_equal
CHECK (id_following <> id_follower);