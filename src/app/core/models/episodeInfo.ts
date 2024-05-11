import { Episode } from "./episode";
import { Info } from "./info";

export interface EpisodeInfo {
    info: Info;
    results: Episode[];
}