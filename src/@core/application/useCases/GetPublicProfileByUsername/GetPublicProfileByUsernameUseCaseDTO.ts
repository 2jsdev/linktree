export interface GetPublicProfileByUsernameDTO {
  username: string;
}

export interface PublicProfileResponseDTO {
  username: string;
  name: string | null;
  image: string | null;
  links: {
    label: string;
    url: string;
    visible: boolean;
    order: number;
  }[];
}
