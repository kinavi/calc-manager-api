import { ObjectId } from "mongodb";
export interface DailyRate {
    _id: ObjectId;
    userId: string;
    weight: string;
    age: string;
    height: string;
    sex: string;
    activity: "low" | "medium" | 'high';
    caloriesPerDay: string;
}
//# sourceMappingURL=types.d.ts.map