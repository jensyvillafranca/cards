declare class CardDescriptionDto {
    idDescription?: number;
    description: string;
}
export declare class UpdateCardDto {
    title?: string;
    descriptions?: CardDescriptionDto[];
}
export {};
