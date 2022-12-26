BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[api] ADD [moduleId] INT;

-- AddForeignKey
ALTER TABLE [dbo].[api] ADD CONSTRAINT [api_moduleId_fkey] FOREIGN KEY ([moduleId]) REFERENCES [dbo].[modules]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
