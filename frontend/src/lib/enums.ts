export const Role = {
  ADMIN: "ADMIN",
  TRAINER: "TRAINER",
  MEMBER: "MEMBER",
} as const;
export type Role = typeof Role[keyof typeof Role];

export const MuscleGroup = {
  ALL: "ALL",
  CHEST: "CHEST",
  BACK: "BACK",
  SHOULDERS: "SHOULDERS",
  ARMS: "ARMS",
  CORE: "CORE",
  LEGS: "LEGS",
  CARDIO: "CARDIO",
} as const;
export type MuscleGroup = typeof MuscleGroup[keyof typeof MuscleGroup];

export const SubMuscle = {
  UPPER_CHEST: "UPPER_CHEST",
  MIDDLE_CHEST: "MIDDLE_CHEST",
  LOWER_CHEST: "LOWER_CHEST",
  UPPER_BACK: "UPPER_BACK",
  LATS: "LATS",
  LOWER_BACK: "LOWER_BACK",
  FRONT_DELTS: "FRONT_DELTS",
  SIDE_DELTS: "SIDE_DELTS",
  REAR_DELTS: "REAR_DELTS",
  BICEPS_LONG_HEAD: "BICEPS_LONG_HEAD",
  BICEPS_SHORT_HEAD: "BICEPS_SHORT_HEAD",
  BRACHIALIS: "BRACHIALIS",
  TRICEPS_LONG_HEAD: "TRICEPS_LONG_HEAD",
  TRICEPS_LATERAL_HEAD: "TRICEPS_LATERAL_HEAD",
  TRICEPS_MEDIAL_HEAD: "TRICEPS_MEDIAL_HEAD",
  UPPER_ABS: "UPPER_ABS",
  LOWER_ABS: "LOWER_ABS",
  OBLIQUES: "OBLIQUES",
  QUADS: "QUADS",
  HAMSTRINGS: "HAMSTRINGS",
  GLUTES: "GLUTES",
  CALVES: "CALVES",
} as const;
export type SubMuscle = typeof SubMuscle[keyof typeof SubMuscle];

export const Difficulty = {
  BEGINNER: "BEGINNER",
  INTERMEDIATE: "INTERMEDIATE",
  ADVANCED: "ADVANCED",
} as const;
export type Difficulty = typeof Difficulty[keyof typeof Difficulty];

export const ProgressStatus = {
  NOT_STARTED: "NOT_STARTED",
  IN_PROGRESS: "IN_PROGRESS",
  COMPLETED: "COMPLETED",
} as const;
export type ProgressStatus = typeof ProgressStatus[keyof typeof ProgressStatus];
