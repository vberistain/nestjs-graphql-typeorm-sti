export type UserPayload = {
    userId: number;
    email: string;
    displayName?: string;
    initials?: string;
    avatar?: string;
    anonymous: boolean;
    contentLanguage?: string;
    interfaceLanguage?: string;
    providerId: string;
    provider?: string;
    devideId?: string;
};
