export type NotificationDTO = {
    id?: string,
    title?: string,
    subtitle?: string,
    tagId?: string,
    tagName?: string,
    content?: string,
    status?: NotificationStatus,
    createdAt?: string,
    updatedAt?: string,
}

export enum NotificationStatus {
    Active = "Active",
    Deleted = "Deleted",
    Updated = "Updated"
}

export type NotificationTag ={
    id?: string,
    tagName?: string,
    status?: NotificationTagStatus,
    createdAt?: string,
}

export enum NotificationTagStatus {
    Active = "Active",
    Deleted = "Deleted"
}

export type NotificationSeenDTO = {
    id?: string,
    userLoginId?: string,
    latestTime?: string,
}


