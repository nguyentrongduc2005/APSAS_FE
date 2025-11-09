import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Award, Target, Zap } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import progressService from "../../services/progressService";
import ProfileHeader from "../../components/student/ProfileHeader";
import ProgressTabs from "../../components/student/ProgressTabs";
import ActivityChart from "../../components/student/ActivityChart";
import CourseProgressCard from "../../components/student/CourseProgressCard";
import AchievementCard from "../../components/student/AchievementCard";

export default function StudentProgress() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("hoat-dong");
  const [loading, setLoading] = useState(true);

  // State for data
  const [stats, setStats] = useState({
    totalCourses: 0,
    completed: 0,
    completionRate: 0,
  });
  const [activityData, setActivityData] = useState([]);
  const [currentCourses, setCurrentCourses] = useState([]);
  const [achievements, setAchievements] = useState([]);

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const studentId = user?.id || "mock-student-id";

        // Gọi các service song song
        const [statsData, scoreData, coursesData, achievementsData] =
          await Promise.all([
            progressService.getStats(studentId),
            progressService.getScoreData(studentId, "7days"),
            progressService.getCurrentCourses(studentId),
            progressService.getAchievements(studentId),
          ]);

        setStats(statsData);
        setActivityData(scoreData);
        setCurrentCourses(coursesData);
        setAchievements(achievementsData);
      } catch (error) {
        console.error("Error fetching progress data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user?.id]);

  // Handle date range change - fetch new data from service
  const handleDateRangeChange = async (range) => {
    try {
      const studentId = user?.id || "mock-student-id";
      const newData = await progressService.getScoreData(studentId, range);
      setActivityData(newData);
    } catch (error) {
      console.error("Error fetching score data:", error);
    }
  };

  // Map achievements with icons
  const achievementsWithIcons = achievements.map((achievement) => ({
    ...achievement,
    icon:
      achievement.icon === "Award"
        ? Award
        : achievement.icon === "Zap"
        ? Zap
        : Target,
  }));

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-white text-lg">Đang tải...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Avatar and Stats */}
      <ProfileHeader
        user={user}
        stats={stats}
        onEditClick={() => navigate("/profile")}
      />

      {/* Tabs */}
      <ProgressTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Tab Content */}
      {activeTab === "hoat-dong" && (
        <ActivityChart
          data={activityData}
          onDateRangeChange={handleDateRangeChange}
        />
      )}

      {activeTab === "dang-lam" && (
        <div className="space-y-4">
          <h3 className="text-white font-bold text-lg">Bài tập đang làm</h3>
          {currentCourses.map((course) => (
            <CourseProgressCard key={course.id} course={course} />
          ))}
        </div>
      )}

      {activeTab === "hoan-tat" && (
        <div className="space-y-4">
          <h3 className="text-white font-bold text-lg mb-4">
            Thành tích gần đây
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievementsWithIcons.map((achievement) => (
              <AchievementCard key={achievement.id} achievement={achievement} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
