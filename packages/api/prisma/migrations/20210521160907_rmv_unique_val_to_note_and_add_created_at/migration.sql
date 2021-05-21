-- DropIndex
DROP INDEX "Note.title_unique";

-- AlterTable
ALTER TABLE "Note" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
