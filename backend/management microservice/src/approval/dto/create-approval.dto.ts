import { ApiProperty } from "@nestjs/swagger";

export class CreateApprovalDto {
    @ApiProperty()
    moduleName: string;
    @ApiProperty()
    itemId: number;
    @ApiProperty()
    createdBy: number;
    @ApiProperty()
    approvalType: string;
    @ApiProperty()
    body: any | null;
    @ApiProperty()
    previousId: number | null
}
