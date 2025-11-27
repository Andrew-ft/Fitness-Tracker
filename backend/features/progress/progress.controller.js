import * as progressService from "./progress.service.js";

export const startRoutine = async (req, res) => {
  try {
    const memberId = req.user.id;
    const { routineId } = req.params;

    const data = await progressService.startRoutineProgress(
      memberId,
      parseInt(routineId)
    );

    res.status(200).json({ success: true, ...data });
  } catch (error) {
    console.error("Start routine error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export const finishRoutine = async (req, res) => {
  try {
    const memberId = req.user.id;
    const { routineId } = req.params;
    const { sessionId, completedWorkoutIds } = req.body;

    const progress = await progressService.finishRoutineProgress(
      memberId,
      parseInt(routineId),
      sessionId,
      completedWorkoutIds ?? []
    );

    res.status(200).json({ success: true, progress });
  } catch (error) {
    console.error("Finish routine error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getRoutineProgress = async (req, res) => {
  try {
    const memberId = req.user.id;
    const { routineId } = req.params;

    const progress = await progressService.getMemberRoutineProgress(
      memberId,
      parseInt(routineId)
    );

    res.status(200).json({ success: true, progress });
  } catch (error) {
    console.error("Get routine progress error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getAnalytics = async (req, res) => {
  try {
    const memberId = req.user.id;

    const analytics = await progressService.getMemberAnalytics(memberId);

    res.status(200).json({ success: true, analytics });
  } catch (error) {
    console.error("Analytics error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getMemberAnalyticsById = async (req, res) => {
  try {
    const { memberId } = req.params;
    const analytics = await progressService.getMemberAnalytics(Number(memberId));
    res.status(200).json({ success: true, analytics });
  } catch (error) {
    console.error("Member analytics error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};