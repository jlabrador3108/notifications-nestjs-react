import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsString } from "class-validator"

export class Notification {
    id: number
    event_name: String
    type_notification: "instantly" | "batch"
    content: String
    iduser: String
    read: Boolean
}

export class NotificationEmail {

    @IsString()
    event_name: String

    type_notification: "instantly" | "batch"

    @IsEmail()
    email: String

    content: String
}