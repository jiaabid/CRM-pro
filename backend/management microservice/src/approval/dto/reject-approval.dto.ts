import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class RejectApprovalDto {
    @ApiProperty()
    @IsNotEmpty()
    rejectionMessage: string;
   
}
