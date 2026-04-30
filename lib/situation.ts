export type GradeLevel = "10th" | "11th" | "12th" | "Just graduated";

export interface SituationData {
  grade: GradeLevel;
  firstGen: "Yes" | "No" | "Not sure yet";
  workStatus: "Yes, part-time" | "Yes, full-time" | "No" | "It depends";
}

export function isWorking(workStatus: SituationData["workStatus"]): boolean {
  return workStatus === "Yes, part-time" || workStatus === "Yes, full-time" || workStatus === "It depends";
}
