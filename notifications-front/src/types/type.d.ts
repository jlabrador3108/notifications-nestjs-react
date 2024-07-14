export interface Notification {
    id: number
    event_name: string
    type_notification: string
    createdAt: string
    content: string
    iduser: string
    read: boolean
}

export interface NotificationState extends Notification {
    quantity?: number;
}
