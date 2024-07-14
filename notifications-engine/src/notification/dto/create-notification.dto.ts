import { ApiProperty } from "@nestjs/swagger"

export class CreateNotificationDto { }

export class CreateNotificationEmailDto {

    event_name: String
    type_notification: "instantly" | "batch"

    email: String

    content: String
}
