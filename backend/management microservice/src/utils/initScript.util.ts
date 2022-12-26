import { role, PrismaClient } from "@prisma/client"
import { PrismaService } from "src/prisma/prisma.service"
import { defaultPermissions, hashPassword } from "./helper.util"

export const init = async () => {
    const prismaService: PrismaService = new PrismaService()
    const usercount = await prismaService.user.count()
    console.log(usercount == 0)
    if (usercount == 0) {
        const rolecount = await prismaService.role.count()
        if (rolecount == 0) {
            //create a admin role
            const roleSnap = await prismaService.role.create({
                data: {
                    name: "admin"
                }
            });

            //create admin user
            //email: admin@csquare.co, password:"admin"
            const password = await hashPassword("admin")
            const userSnap = await prismaService.user.create({
                data: {
                    firstname: "admin",
                    lastname: "user",
                    email: "admin@csqaure.co",
                    password: password,
                    roleId: roleSnap.id
                }
            })

            //create default permissions
            defaultPermissions.map(el => {
                el["isApproved"] = true
                el["approvedBy"] = userSnap.id
                el["approvedAt"] = new Date()

            })
            const permissionSnap = await prismaService.permission.createMany({ data: defaultPermissions })

            //assign the default permissions to the admin role

            //fetching permission
            const permissions = await prismaService.permission.findMany({
                select: {
                    id: true,
                    name: true
                }
            })

            const rolePermissionPayload = []
            permissions.forEach(permission => {
                return rolePermissionPayload.push({
                    permissionId: permission.id,
                    name: permission.name,
                    roleId: roleSnap.id,
                    createdBy: userSnap.id,
                    approvedBy: userSnap.id,
                    createdAt: new Date(),
                    approvedAt: new Date(),
                    canAdd:true,
                    canView:true,
                    canUpdate:true,
                    canDelete:true
                })
            })
            //assgining permission
            const assignPermissions = await prismaService.role_permission.createMany({
                data: rolePermissionPayload
            });

            console.log("default user created!")
            let dbVariableCount = await prismaService.dbVariable.count()
             console.log(dbVariableCount,'count')
            if (dbVariableCount == 0) {
                await prismaService.dbVariable.createMany({
                    data: [
                        {
                            name: "module_type"
                        },
                        {
                            name: "field_type"
                        },
                        {
                            name: "method_type"
                        }
                    ]
                });
                let moduleTypeId = await prismaService.dbVariable.findFirst({
                    where: {
                        name: "module_type"
                    },
                    select: {
                        id: true
                    }
                });
                //creating module detail
                await prismaService.dbVariableDetail.createMany({
                    data:[
                        {
                            variableId:moduleTypeId.id,
                            value:"default"
                        },
                        {
                            variableId:moduleTypeId.id,
                            value:"dynamic"
                        }
                    ]
                });

                
                let fieldTypeId = await prismaService.dbVariable.findFirst({
                    where: {
                        name: "field_type"
                    },
                    select: {
                        id: true
                    }
                });

                //creating field detail
                await prismaService.dbVariableDetail.createMany({
                    data:[
                        {
                            variableId:fieldTypeId.id,
                            value:"request"
                        },
                        {
                            variableId:fieldTypeId.id,
                            value:"response"
                        }
                    ]
                });

                
                let methodTypeId = await prismaService.dbVariable.findFirst({
                    where: {
                        name: "method_type"
                    },
                    select: {
                        id: true
                    }
                });

                //creating method detail
                await prismaService.dbVariableDetail.createMany({
                    data:[
                        {
                            variableId:methodTypeId.id,
                            value:"GET"
                        },
                        {
                            variableId:methodTypeId.id,
                            value:"POST"
                        },
                        {
                            variableId:methodTypeId.id,
                            value:"PATCH"
                        },
                        {
                            variableId:methodTypeId.id,
                            value:"DELETE"
                        }
                    ]
                });
            }

            // await prismaService.dbVariable.create({
            //     data: {
            //         name: "module_type",
            //         variableDetail: {
            //             create: [
            //                 {
            //                     value: "dynamic"
            //                 },
            //                 {
            //                     value: "default"
            //                 }
            //             ]
            //         }
            //     }
            // })

            // await prismaService.dbVariable.create({
            //     data: {
            //         name: "field_type",
            //         variableDetail: {
            //             create: [
            //                 {
            //                     value: "request"
            //                 },
            //                 {
            //                     value: "response"
            //                 }
            //             ]
            //         }
            //     }
            // })

        

            //create the module types


        }
    }
        await prismaService.dbVariable.create({
                data: {
                    name: "test",
                    variableDetail: {
                        create: [
                            {
                                value: "test1"
                            },
                            {
                                value: "test2"
                            },
                            

                        ]
                    }
                }
            })
    console.log("Default user already exist!");
}