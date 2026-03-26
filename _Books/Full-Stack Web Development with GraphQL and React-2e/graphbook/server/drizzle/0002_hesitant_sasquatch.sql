ALTER TABLE "chats" ALTER COLUMN "first_name" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "chats" ALTER COLUMN "first_name" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "chats" ALTER COLUMN "last_name" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "chats" ALTER COLUMN "last_name" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "chats" ALTER COLUMN "email" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "chats" ALTER COLUMN "email" DROP NOT NULL;