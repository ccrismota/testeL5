import { Character } from "./character";
import { Info } from "./info";

export interface EpisodeInfo {
    info:    Info;
    results: Character[];
}