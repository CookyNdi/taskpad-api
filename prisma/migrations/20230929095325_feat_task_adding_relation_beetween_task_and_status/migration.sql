/*
  Warnings:

  - You are about to drop the column `status` on the `Task` table. All the data in the column will be lost.
  - Added the required column `status_id` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Task" DROP COLUMN "status",
ADD COLUMN     "status_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "Status"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
