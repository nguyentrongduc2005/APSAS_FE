// src/services/progressService.js
import api from "./api";

// Normalize ProgressDTO (from /progress/{id}/current) to UI-friendly shape
function mapProgressDtoToUi(data) {
	const daily = Array.isArray(data?.dailyScoreDTOList) ? data.dailyScoreDTOList : [];

	const activityData = daily.map((d, idx) => ({
		date: d?.date ?? `D${idx + 1}`,
		score: Number(d?.score ?? d?.value ?? 0) || 0,
	}));

	const totalCourses = Number(data?.totalCourses ?? 0) || 0;
	const completed = Number(data?.completedCourses ?? 0) || 0;
	const averageScore = Number(data?.averageScore ?? 0) || 0;

	return {
		rawProgress: daily,
		stats: { totalCourses, completed, averageScore },
		activityData,
		currentCourses: Array.isArray(data?.currentCourses) ? data.currentCourses : [],
		achievements: Array.isArray(data?.achievements) ? data.achievements : [],
	};
}

// Map legacy list response (unknown shape) into a safe UI shape
function mapLegacyListToUi(list) {
	if (!Array.isArray(list)) {
		return {
			rawProgress: [],
			stats: { totalCourses: 0, completed: 0, averageScore: 0 },
			activityData: [],
			currentCourses: [],
			achievements: [],
		};
	}

	// Best-effort mapping: count items as courses, assume `completed` boolean if present
	const totalCourses = list.length;
	const completed = list.filter((c) => c?.completed).length || 0;

	return {
		rawProgress: list,
		stats: { totalCourses, completed, averageScore: 0 },
		activityData: [],
		currentCourses: list.slice(0, 10),
		achievements: [],
	};
}

const EMPTY_RESULT = {
	rawProgress: [],
	stats: { totalCourses: 0, completed: 0, averageScore: 0 },
	activityData: [],
	currentCourses: [],
	achievements: [],
};

const progressService = {
	async getProgress(studentId) {
		if (!studentId) return EMPTY_RESULT;

		// prefer /progress/{id}/current
		try {
			const res = await api.get(`/progress/${studentId}/current`);
			const dto = res?.data?.data ?? res?.data ?? null;
			if (dto) return mapProgressDtoToUi(dto);
			return EMPTY_RESULT;
		} catch (err) {
			const status = err?.response?.status;
			// If not found, try legacy endpoint; on other errors return safe empty
			if (status === 404) {
				try {
					const r2 = await api.get(`/progress/${studentId}`);
					const list = r2?.data?.data ?? r2?.data ?? [];
					return mapLegacyListToUi(list);
				} catch {
					return EMPTY_RESULT;
				}
			}
			return EMPTY_RESULT;
		}
	},
};

export default progressService;

