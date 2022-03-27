export interface ParentCity {
  Key: string;
  LocalizedName: string;
  EnglishName: string;
}

export interface IGeolocation {
  ParentCity: ParentCity;
}
