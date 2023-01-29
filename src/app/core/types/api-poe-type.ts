import { StagiaireModel } from "../models/stagiaire-model";

export type ApiPoeType = {
    id: number;
    title: string;
    beginDate: Date;
    endDate: Date;
    poeType: any;
    stagiaires: StagiaireModel;
    surveySendDateOneMonth: Date ;
    surveySendDateSixMonth: Date ;
    surveySendDateTwelveMonth: Date ;
}
