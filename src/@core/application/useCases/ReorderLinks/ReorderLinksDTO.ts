export interface LinkDTO {
  id: string;
  order: number;
}

export interface ReorderLinksDTO {
  userId: string;
  links: LinkDTO[];
}
