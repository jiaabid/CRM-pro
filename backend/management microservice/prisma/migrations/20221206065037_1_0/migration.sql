BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[role] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    [parentId] INT,
    [isApproved] BIT NOT NULL CONSTRAINT [role_isApproved_df] DEFAULT 0,
    [isDeleted] BIT NOT NULL CONSTRAINT [role_isDeleted_df] DEFAULT 0,
    [createdBy] INT,
    [updatedBy] INT,
    [deletedBy] INT,
    [approvedBy] INT,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [role_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2,
    [deletedAt] DATETIME2,
    [approvedAt] DATETIME2,
    CONSTRAINT [role_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[permission] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    [canView] BIT NOT NULL CONSTRAINT [permission_canView_df] DEFAULT 0,
    [canAdd] BIT NOT NULL CONSTRAINT [permission_canAdd_df] DEFAULT 0,
    [canUpdate] BIT NOT NULL CONSTRAINT [permission_canUpdate_df] DEFAULT 0,
    [canDelete] BIT NOT NULL CONSTRAINT [permission_canDelete_df] DEFAULT 0,
    [isApproved] BIT NOT NULL CONSTRAINT [permission_isApproved_df] DEFAULT 0,
    [isDeleted] BIT NOT NULL CONSTRAINT [permission_isDeleted_df] DEFAULT 0,
    [createdBy] INT,
    [updatedBy] INT,
    [deletedBy] INT,
    [approvedBy] INT,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [permission_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2,
    [deletedAt] DATETIME2,
    [approvedAt] DATETIME2,
    CONSTRAINT [permission_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[role_permission] (
    [id] INT NOT NULL IDENTITY(1,1),
    [roleId] INT NOT NULL,
    [permissionId] INT NOT NULL,
    [canAdd] BIT CONSTRAINT [role_permission_canAdd_df] DEFAULT 0,
    [canView] BIT CONSTRAINT [role_permission_canView_df] DEFAULT 0,
    [canUpdate] BIT CONSTRAINT [role_permission_canUpdate_df] DEFAULT 0,
    [canDelete] BIT CONSTRAINT [role_permission_canDelete_df] DEFAULT 0,
    [isApproved] BIT CONSTRAINT [role_permission_isApproved_df] DEFAULT 0,
    [createdBy] INT,
    [approvedBy] INT,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [role_permission_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [approvedAt] DATETIME2,
    CONSTRAINT [role_permission_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[department] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    [isApproved] BIT NOT NULL CONSTRAINT [department_isApproved_df] DEFAULT 0,
    [isDeleted] BIT NOT NULL CONSTRAINT [department_isDeleted_df] DEFAULT 0,
    [createdBy] INT,
    [updatedBy] INT,
    [deletedBy] INT,
    [approvedBy] INT,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [department_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2,
    [deletedAt] DATETIME2,
    [approvedAt] DATETIME2,
    CONSTRAINT [department_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[user] (
    [id] INT NOT NULL IDENTITY(1,1),
    [firstname] NVARCHAR(1000),
    [lastname] NVARCHAR(1000),
    [email] NVARCHAR(1000) NOT NULL,
    [password] NVARCHAR(1000) NOT NULL,
    [roleId] INT NOT NULL,
    [deptId] INT,
    [approverId] INT,
    [useActiveDirectory] BIT CONSTRAINT [user_useActiveDirectory_df] DEFAULT 0,
    [isActive] BIT NOT NULL CONSTRAINT [user_isActive_df] DEFAULT 1,
    [isApproved] BIT NOT NULL CONSTRAINT [user_isApproved_df] DEFAULT 0,
    [isLogged] BIT CONSTRAINT [user_isLogged_df] DEFAULT 0,
    [isDeleted] BIT NOT NULL CONSTRAINT [user_isDeleted_df] DEFAULT 0,
    [createdBy] INT,
    [updatedBy] INT,
    [deletedBy] INT,
    [approvedBy] INT,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [user_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2,
    [deletedAt] DATETIME2,
    [approvedAt] DATETIME2,
    [lastLoginAt] DATETIME2,
    CONSTRAINT [user_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[employee] (
    [id] INT NOT NULL IDENTITY(1,1),
    [title] NVARCHAR(1000),
    [photo] NVARCHAR(1000),
    [address] NVARCHAR(1000),
    [contact] NVARCHAR(1000),
    [city] NVARCHAR(1000),
    [region] NVARCHAR(1000),
    [country] NVARCHAR(1000),
    [postalCode] NVARCHAR(1000),
    [description] NVARCHAR(1000),
    [userId] INT NOT NULL,
    CONSTRAINT [employee_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [employee_userId_key] UNIQUE NONCLUSTERED ([userId])
);

-- CreateTable
CREATE TABLE [dbo].[approval] (
    [id] INT NOT NULL IDENTITY(1,1),
    [moduleName] NVARCHAR(1000),
    [itemId] INT,
    [approvalType] NVARCHAR(1000),
    [body] NVARCHAR(1000),
    [isApproved] BIT NOT NULL CONSTRAINT [approval_isApproved_df] DEFAULT 0,
    [isRejected] BIT NOT NULL CONSTRAINT [approval_isRejected_df] DEFAULT 0,
    [rejectionMessage] NVARCHAR(1000),
    [assignTo] INT,
    [previousId] INT,
    [isDeleted] BIT NOT NULL CONSTRAINT [approval_isDeleted_df] DEFAULT 0,
    [createdBy] INT,
    [updatedBy] INT,
    [deletedBy] INT,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [approval_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2,
    [deletedAt] DATETIME2,
    [approvedAt] DATETIME2,
    CONSTRAINT [approval_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[dbVariable] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [dbVariable_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2,
    CONSTRAINT [dbVariable_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[dbVariableDetail] (
    [id] INT NOT NULL IDENTITY(1,1),
    [variableId] INT,
    [value] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [dbVariableDetail_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2,
    CONSTRAINT [dbVariableDetail_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[modules] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    [moduleTypeId] INT,
    CONSTRAINT [modules_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[api] (
    [id] INT NOT NULL IDENTITY(1,1),
    [url] NVARCHAR(1000) NOT NULL,
    [requestType] NVARCHAR(1000) NOT NULL,
    [requestMethodId] INT NOT NULL,
    [isDeleted] BIT NOT NULL CONSTRAINT [api_isDeleted_df] DEFAULT 0,
    [createdBy] INT,
    [updatedBy] INT,
    [deletedBy] INT,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [api_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2,
    [deletedAt] DATETIME2,
    [approvedAt] DATETIME2,
    CONSTRAINT [api_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[role] ADD CONSTRAINT [role_parentId_fkey] FOREIGN KEY ([parentId]) REFERENCES [dbo].[role]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[role_permission] ADD CONSTRAINT [role_permission_roleId_fkey] FOREIGN KEY ([roleId]) REFERENCES [dbo].[role]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[role_permission] ADD CONSTRAINT [role_permission_permissionId_fkey] FOREIGN KEY ([permissionId]) REFERENCES [dbo].[permission]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[user] ADD CONSTRAINT [user_roleId_fkey] FOREIGN KEY ([roleId]) REFERENCES [dbo].[role]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[user] ADD CONSTRAINT [user_deptId_fkey] FOREIGN KEY ([deptId]) REFERENCES [dbo].[department]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[employee] ADD CONSTRAINT [employee_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[user]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[dbVariableDetail] ADD CONSTRAINT [dbVariableDetail_variableId_fkey] FOREIGN KEY ([variableId]) REFERENCES [dbo].[dbVariable]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[modules] ADD CONSTRAINT [modules_moduleTypeId_fkey] FOREIGN KEY ([moduleTypeId]) REFERENCES [dbo].[dbVariableDetail]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[api] ADD CONSTRAINT [api_requestMethodId_fkey] FOREIGN KEY ([requestMethodId]) REFERENCES [dbo].[dbVariableDetail]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
