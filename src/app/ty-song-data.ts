
export interface TySongData {
    artiste: string;
    downloads?: number;
    formatcode_audio: string;
    formatcode_video?: string;
    likes?: number;
    source_type: 'youtube' | 'abs' | 'streaming';
    title: string;
    trackid: number;
    upload_date: number;
    year: number;
    tags?: string;
};

export interface TyComment {
    comment: string;
    displayName: string;
    photo: string;
    userid: string;
}

// export enum SourceType{
//     youtube, abs, 'streaming'
// }