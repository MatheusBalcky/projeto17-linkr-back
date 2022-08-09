CREATE TABLE "users" (
	"id" serial PRIMARY KEY,
	"username" varchar(120) NOT NULL UNIQUE,
	"email" varchar(120) NOT NULL UNIQUE,
	"password" varchar(120) NOT NULL,
	"createdAt" timestamp with time zone NOT NULL DEFAULT NOW()
);

CREATE TABLE "posts" (
    "id" serial PRIMARY KEY,
    "url" varchar(200) NOT NULL,
    "text" varchar(250) NOT NULL,
    "userId" integer NOT NULL REFERENCES "users"("id"),
    "createdAt" timestamp with time zone NOT NULL DEFAULT NOW()
);

CREATE TABLE "hashtags" (
    "id" serial PRIMARY KEY,
    "name" varchar(50) NOT NULL UNIQUE,
    "createdAt" timestamp with time zone NOT NULL DEFAULT NOW()
);

CREATE TABLE "hashtagsPosts" (
    "id" serial PRIMARY KEY,
    "postId" integer NOT NULL REFERENCES "posts"("id"),
    "hashtagId" integer NOT NULL REFERENCES "hashtags"("id"),
    "createdAt" timestamp with time zone NOT NULL DEFAULT NOW()
);

CREATE TABLE "likes" (
    "id" serial PRIMARY KEY,
    "postId" integer NOT NULL REFERENCES "posts"("id"),
    "userId" integer NOT NULL REFERENCES "users"("id"),
    "createdAt" timestamp with time zone NOT NULL DEFAULT NOW()
);