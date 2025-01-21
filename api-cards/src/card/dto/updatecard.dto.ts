export class UpdateCardDto {
    title?: string;
    descriptions?: { idDescription?: number; description: string }[];
  }