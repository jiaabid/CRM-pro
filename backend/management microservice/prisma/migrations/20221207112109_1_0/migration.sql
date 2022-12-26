BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[fields] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    [label] NVARCHAR(1000) NOT NULL,
    [datatype] NVARCHAR(1000) NOT NULL,
    [required] BIT NOT NULL,
    [nullable] BIT NOT NULL,
    [routeId] INT NOT NULL,
    [fieldTypeId] INT NOT NULL,
    CONSTRAINT [fields_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[fields] ADD CONSTRAINT [fields_fieldTypeId_fkey] FOREIGN KEY ([fieldTypeId]) REFERENCES [dbo].[dbVariableDetail]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[fields] ADD CONSTRAINT [fields_routeId_fkey] FOREIGN KEY ([routeId]) REFERENCES [dbo].[api]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
