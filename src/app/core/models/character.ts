import { Gender } from "./gender";
import { Origin } from "./origin";
import { Species } from "./species";
import { Status } from "./status";
import { Location } from "./location";

export interface Character {
    id:       number;
    name:     string;
    status:   Status;
    species:  Species;
    type:     string;
    gender:   Gender;
    origin:   Origin;
    location: Location;
    image:    string;
    episode:  string[];
    url:      string;
    created:  Date;
}





