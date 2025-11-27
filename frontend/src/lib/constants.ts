
export const MuscleGroups = ["ALL", "CHEST", "BACK", "SHOULDERS", "ARMS", "CORE", "LEGS", "CARDIO"] as const;
export type MuscleGroup = typeof MuscleGroups[number];

export const Difficulties = ["BEGINNER", "INTERMEDIATE", "ADVANCED"] as const;
export type Difficulty = typeof Difficulties[number];

export const ProgressStatus = ["NOT_STARTED", "IN_PROGRESS", "COMPLETED"] as const;
export type ProgressStatus = typeof ProgressStatus[number];

export const SubMuscles = [
  "UPPER_CHEST",
  "MIDDLE_CHEST",
  "LOWER_CHEST",
  "UPPER_BACK",
  "LATS",
  "LOWER_BACK",
  "FRONT_DELTS",
  "SIDE_DELTS",
  "REAR_DELTS",
  "BICEPS_LONG_HEAD",
  "BICEPS_SHORT_HEAD",
  "BRACHIALIS",
  "TRICEPS_LONG_HEAD",
  "TRICEPS_LATERAL_HEAD",
  "TRICEPS_MEDIAL_HEAD",
  "UPPER_ABS",
  "LOWER_ABS",
  "OBLIQUES",
  "QUADS",
  "HAMSTRINGS",
  "GLUTES",
  "CALVES"
] as const;

export type SubMuscle = typeof SubMuscles[number];
