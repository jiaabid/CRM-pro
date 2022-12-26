export class CreateFieldDto {
 fields: field[]
}

class field{
    routeId:number;
    fieldTypeId:number;
    name: string;
    label: string;
    datatype:string;
    required:boolean;
    nullable:boolean;
}