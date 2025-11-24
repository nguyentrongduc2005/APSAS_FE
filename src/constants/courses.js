// src/constants/courses.js

// Khóa học đang học dở (dùng ở "Continue Previous")
export const continueCourse = {
  id: 1, // <-- ID số thật trong DB
  title: "Khóa học Lập Trình 1",
  desc: "Khóa học nền tảng về lập trình, phù hợp cho người mới bắt đầu.",
  image:
    "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=450&fit=crop",
  stats: {
    learners: 32,
    progress: "40%", // bạn có thể đổi tùy ý
  },
  badge: "Đang học",
};

// Các khóa “Featured”
export const featured = [
  {
    id: 2, // <-- ID số thật trong DB
    title: "Khóa học Lập Trình 2",
    desc: "Làm quen với OOP, class, object và cách tổ chức project.",
    image:
      "https://images.unsplash.com/photo-1554941829-202a0b2403b0?w=800&h=450&fit=crop",
    stats: {
      learners: 48,
      progress: "12 bài",
    },
    badge: "Nổi bật",
  },
  {
    id: 3,
    title: "Khóa học Lập Trình 3",
    desc: "Cấu trúc dữ liệu cơ bản: array, list, stack, queue.",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=450&fit=crop",
    stats: {
      learners: 27,
      progress: "8 bài",
    },
    badge: "Mới",
  },
  {
    id: 4,
    title: "Khóa học Lập Trình 4",
    desc: "Thuật toán và tư duy giải quyết vấn đề cho developer.",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=450&fit=crop",
    stats: {
      learners: 65,
      progress: "15 bài",
    },
    badge: "Hot",
  },
];

// Nhóm “Interview”
export const interview = [
  {
    id: 5,
    title: "Khóa học Lập Trình 5",
    desc: "Chuẩn bị kiến thức phỏng vấn: thuật toán, data structure.",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=450&fit=crop",
    stats: {
      learners: 40,
      progress: "10 chủ đề",
    },
    badge: "Interview",
  },
  {
    id: 6,
    title: "Khóa học Lập Trình 6",
    desc: "Kinh nghiệm phỏng vấn frontend: HTML, CSS, JavaScript.",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=450&fit=crop",
    stats: {
      learners: 21,
      progress: "7 chủ đề",
    },
    badge: "Interview",
  },
  {
    id: 7,
    title: "Khóa học Lập Trình 7",
    desc: "Kinh nghiệm phỏng vấn backend: API, DB, hệ thống.",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=450&fit=crop",
    stats: {
      learners: 18,
      progress: "6 chủ đề",
    },
    badge: "Interview",
  },
];

// Nhóm “Learn”
export const learn = [
  {
    id: 8,
    title: "Khóa học Lập Trình 8",
    desc: "Web fundamentals: HTML, CSS, JavaScript căn bản.",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=450&fit=crop",
    stats: {
      learners: 52,
      progress: "20 bài",
    },
    badge: "Learn",
  },
  {
    id: 9,
    title: "Khóa học Lập Trình 9",
    desc: "React cơ bản: component, props, state, hook.",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=450&fit=crop",
    stats: {
      learners: 34,
      progress: "14 bài",
    },
    badge: "Learn",
  },
  {
    id: 10,
    title: "Khóa học Lập Trình 10",
    desc: "Spring Boot cơ bản: REST API, JPA, security.",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=450&fit=crop",
    stats: {
      learners: 29,
      progress: "12 bài",
    },
    badge: "Learn",
  },
];
