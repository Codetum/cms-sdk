export interface Space {
    id: string;
    name: string;
    defaultLocale: string;
    locales: SpaceLocale;
    createdAt: Date;
    updatedAt: Date;
}

export interface SpaceLocale {
    name: string;
    code: string;
}

export interface Content {
    id: string;
    locale: string;
    data: any;
    createdAt: Date;
    updatedAt: Date;
}

export interface ContentOptions {
    locale?: string;
}

export interface ContentQueryOptions extends ContentOptions {
    sortBy?: "createdAt" | "updatedAt" | "publishedAt";
    limit?: number;
}
