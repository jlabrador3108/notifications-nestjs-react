import { ApiProperty } from "@nestjs/swagger"

export class AuthEntity {
    @ApiProperty()
    username: string
    @ApiProperty()
    password: string
}
