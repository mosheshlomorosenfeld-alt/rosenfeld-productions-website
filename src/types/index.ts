export type Role = 'Production' | 'Songwriting' | 'Vocals';
export type Track = { id:string; title:string; year:number; roles:Role[]; mood:string; duration:string; artwork:string; audio:string; credits:string[]; links:{spotify:string; apple:string; amazon:string} };
export type BookingType = 'Studio Session'|'Full Production'|'Songwriting'|'Feature Vocals'|'Sync Licensing';