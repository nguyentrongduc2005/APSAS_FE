import api from "./api";

/**
 * Get detailed information about a specific submission for lecturer view
 * @param {string} submissionId - The ID of the submission
 * @returns {Promise<Object>} Submission details including code, test cases, and feedback
 */
export const getLecturerSubmissionDetail = async (submissionId) => {
  try {
    // TODO: Replace with actual API call
    // const response = await api.get(`/lecturer/submissions/${submissionId}`);
    // return response.data;

    // Mock data with delay to simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: submissionId,
          assignmentTitle: "Implement Singly Linked List",
          studentName: "Nguyễn Văn A",
          studentClass: "SE1801",
          studentAvatar: "https://i.pravatar.cc/150?img=1",
          submittedAt: "2024-11-15 14:30:25",
          language: "java",
          status: "passed", // passed, failed, pending
          score: 95,
          runtime: "142ms",
          memory: "38.5MB",
          timeComplexity: "O(n)",
          spaceComplexity: "O(1)",
          testCasesPassed: 18,
          totalTestCases: 20,
          publicTestCases: [
            {
              id: 1,
              input: "[1, 2, 3]",
              expectedOutput: "1 -> 2 -> 3 -> null",
              actualOutput: "1 -> 2 -> 3 -> null",
              passed: true,
            },
            {
              id: 2,
              input: "[5, 10, 15, 20]",
              expectedOutput: "5 -> 10 -> 15 -> 20 -> null",
              actualOutput: "5 -> 10 -> 15 -> 20 -> null",
              passed: true,
            },
            {
              id: 3,
              input: "[]",
              expectedOutput: "null",
              actualOutput: "null",
              passed: true,
            },
          ],
          privateTestCases: [
            {
              id: 4,
              input: "[1]",
              expectedOutput: "1 -> null",
              actualOutput: "1 -> null",
              passed: true,
            },
            {
              id: 5,
              input: "[100, 200, 300, 400, 500]",
              expectedOutput: "100 -> 200 -> 300 -> 400 -> 500 -> null",
              actualOutput: "100 -> 200 -> 300 -> 400 -> 500 -> null",
              passed: true,
            },
            {
              id: 6,
              input: "[10, 20]",
              expectedOutput: "10 -> 20 -> null",
              actualOutput: "10 -> 20",
              passed: false,
            },
            {
              id: 7,
              input: "[7, 14, 21, 28]",
              expectedOutput: "7 -> 14 -> 21 -> 28 -> null",
              actualOutput: "7 -> 14 -> 21 -> 28 -> null",
              passed: true,
            },
          ],
          code: `public class LinkedList {
    private Node head;
    
    private static class Node {
        int data;
        Node next;
        
        Node(int data) {
            this.data = data;
            this.next = null;
        }
    }
    
    public void insertAtBeginning(int data) {
        Node newNode = new Node(data);
        newNode.next = head;
        head = newNode;
    }
    
    public void insertAtEnd(int data) {
        Node newNode = new Node(data);
        
        if (head == null) {
            head = newNode;
            return;
        }
        
        Node current = head;
        while (current.next != null) {
            current = current.next;
        }
        current.next = newNode;
    }
    
    public void delete(int data) {
        if (head == null) return;
        
        if (head.data == data) {
            head = head.next;
            return;
        }
        
        Node current = head;
        while (current.next != null && current.next.data != data) {
            current = current.next;
        }
        
        if (current.next != null) {
            current.next = current.next.next;
        }
    }
    
    public void display() {
        Node current = head;
        while (current != null) {
            System.out.print(current.data + " -> ");
            current = current.next;
        }
        System.out.println("null");
    }
}`,
          aiFeedback: {
            text: "Code của bạn đã implement đúng các phương thức cơ bản của Linked List với cấu trúc rõ ràng. Tuy nhiên, nên thêm null check cho tham số, tối ưu method delete bằng cách giảm số lần duyệt, và có thể thêm các method hỗ trợ như size() và search() để code hoàn thiện hơn.",
            suggestions: [
              "Nên thêm null check cho tham số data trong các phương thức insert để tránh NullPointerException",
              "Method delete có thể tối ưu bằng cách giảm số lần duyệt và trả về boolean để biết thao tác thành công hay không",
              "Nên thêm method size() để biết số phần tử trong danh sách",
              "Có thể thêm method search() để tìm kiếm phần tử trong danh sách",
              "Nên thêm validation cho input và xử lý các edge case tốt hơn",
            ],
          },
          lecturerFeedback: null, // Will be added by lecturer
        });
      }, 800);
    });
  } catch (error) {
    console.error("Error fetching lecturer submission detail:", error);
    throw error;
  }
};

/**
 * Get detailed information about a specific submission for student view
 * @param {string} submissionId - The ID of the submission
 * @returns {Promise<Object>} Submission details including code, test cases, and feedback
 */
export const getStudentSubmissionDetail = async (submissionId) => {
  try {
    // TODO: Replace with actual API call
    // const response = await api.get(`/student/submissions/${submissionId}`);
    // return response.data;

    // Mock data
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: submissionId,
          assignmentTitle: "Implement Singly Linked List",
          submittedAt: "2024-11-15 14:30:25",
          language: "java",
          status: "passed", // passed, failed, pending
          score: 95,
          runtime: "142ms",
          memory: "38.5MB",
          timeComplexity: "O(n)",
          spaceComplexity: "O(1)",
          testCasesPassed: 15,
          totalTestCases: 15,
          publicTestCases: [
            {
              id: 1,
              input: "[1, 2, 3]",
              expectedOutput: "1 -> 2 -> 3 -> null",
              actualOutput: "1 -> 2 -> 3 -> null",
              passed: true,
            },
            {
              id: 2,
              input: "[5, 10, 15, 20]",
              expectedOutput: "5 -> 10 -> 15 -> 20 -> null",
              actualOutput: "5 -> 10 -> 15 -> 20 -> null",
              passed: true,
            },
            {
              id: 3,
              input: "[]",
              expectedOutput: "null",
              actualOutput: "null",
              passed: true,
            },
          ],
          code: `public class LinkedList {
    private Node head;
    
    private static class Node {
        int data;
        Node next;
        
        Node(int data) {
            this.data = data;
            this.next = null;
        }
    }
    
    public void insertAtBeginning(int data) {
        Node newNode = new Node(data);
        newNode.next = head;
        head = newNode;
    }
    
    public void insertAtEnd(int data) {
        Node newNode = new Node(data);
        
        if (head == null) {
            head = newNode;
            return;
        }
        
        Node current = head;
        while (current.next != null) {
            current = current.next;
        }
        current.next = newNode;
    }
    
    public void delete(int data) {
        if (head == null) return;
        
        if (head.data == data) {
            head = head.next;
            return;
        }
        
        Node current = head;
        while (current.next != null && current.next.data != data) {
            current = current.next;
        }
        
        if (current.next != null) {
            current.next = current.next.next;
        }
    }
    
    public void display() {
        Node current = head;
        while (current != null) {
            System.out.print(current.data + " -> ");
            current = current.next;
        }
        System.out.println("null");
    }
}`,
          aiFeedback: {
            text: "Code của bạn đã implement đúng các phương thức cơ bản của Linked List với cấu trúc rõ ràng. Tuy nhiên, nên thêm null check cho tham số, tối ưu method delete bằng cách giảm số lần duyệt, và có thể thêm các method hỗ trợ như size() và search() để code hoàn thiện hơn.",
            suggestions: [
              "Nên thêm null check cho tham số data trong các phương thức insert để tránh NullPointerException",
              "Method delete có thể tối ưu bằng cách giảm số lần duyệt và trả về boolean để biết thao tác thành công hay không",
              "Nên thêm method size() để biết số phần tử trong danh sách",
              "Có thể thêm method search() để tìm kiếm phần tử trong danh sách",
              "Nên thêm validation cho input và xử lý các edge case tốt hơn",
            ],
          },
          lecturerFeedback: {
            comment:
              "Bài làm tốt! Code của em đã implement đầy đủ các phương thức cơ bản của Linked List. Cấu trúc code rõ ràng, dễ đọc. Tuy nhiên, em nên chú ý thêm các edge cases và validation như AI đã gợi ý. Tiếp tục phát huy!",
            createdAt: "2024-11-16 09:15:30",
          },
        });
      }, 800);
    });
  } catch (error) {
    console.error("Error fetching student submission detail:", error);
    throw error;
  }
};

/**
 * Submit feedback for a student's submission (Lecturer only)
 * @param {string} submissionId - The ID of the submission
 * @param {Object} feedbackData - Feedback data containing comment
 * @returns {Promise<Object>} Response indicating success
 */
export const submitLecturerFeedback = async (submissionId, feedbackData) => {
  try {
    // TODO: Replace with actual API call
    // const response = await api.post(`/lecturer/submissions/${submissionId}/feedback`, feedbackData);
    // return response.data;

    // Mock response with delay
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: "Feedback submitted successfully",
          feedback: {
            ...feedbackData,
            createdAt: new Date().toISOString(),
          },
        });
      }, 1000);
    });
  } catch (error) {
    console.error("Error submitting lecturer feedback:", error);
    throw error;
  }
};

/**
 * Get all submissions for an assignment (Lecturer view)
 * @param {string} assignmentId - The ID of the assignment
 * @returns {Promise<Array>} List of submissions with student info
 */
export const getAssignmentSubmissions = async (assignmentId) => {
  try {
    // TODO: Replace with actual API call
    // const response = await api.get(`/lecturer/assignments/${assignmentId}/submissions`);
    // return response.data;

    // Mock data with delay
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: "sub-1",
            studentName: "Nguyễn Văn A",
            studentClass: "SE1801",
            studentAvatar: "https://i.pravatar.cc/150?img=1",
            submittedAt: "2024-11-15 14:30:25",
            status: "passed",
            score: 95,
            language: "java",
            runtime: "142ms",
            hasFeedback: true,
          },
          {
            id: "sub-2",
            studentName: "Trần Thị B",
            studentClass: "SE1801",
            studentAvatar: "https://i.pravatar.cc/150?img=2",
            submittedAt: "2024-11-15 13:45:10",
            status: "passed",
            score: 88,
            language: "python",
            runtime: "189ms",
            hasFeedback: false,
          },
          {
            id: "sub-3",
            studentName: "Lê Văn C",
            studentClass: "SE1802",
            studentAvatar: "https://i.pravatar.cc/150?img=3",
            submittedAt: "2024-11-15 16:20:45",
            status: "failed",
            score: 45,
            language: "java",
            runtime: "256ms",
            hasFeedback: false,
          },
        ]);
      }, 600);
    });
  } catch (error) {
    console.error("Error fetching assignment submissions:", error);
    throw error;
  }
};

/**
 * Submit code for an assignment (Student)
 * @param {string} assignmentId - The ID of the assignment
 * @param {Object} submissionData - Submission data including code and language
 * @returns {Promise<Object>} Submission result
 */
export const submitAssignment = async (assignmentId, submissionData) => {
  try {
    // TODO: Replace with actual API call
    // const response = await api.post(`/student/assignments/${assignmentId}/submit`, submissionData);
    // return response.data;

    // Mock response
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          submissionId: `sub-${Date.now()}`,
          message: "Code submitted successfully",
        });
      }, 1000);
    });
  } catch (error) {
    console.error("Error submitting assignment:", error);
    throw error;
  }
};

/**
 * Run code without submitting (Student)
 * @param {Object} codeData - Code and test input
 * @returns {Promise<Object>} Test results
 */
export const runCode = async (codeData) => {
  try {
    // TODO: Replace with actual API call
    // const response = await api.post('/student/code/run', codeData);
    // return response.data;

    // Mock response
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          output:
            "Test case 1: PASSED\nTest case 2: PASSED\nTest case 3: PASSED",
          runtime: "145ms",
          memory: "42.3MB",
        });
      }, 1500);
    });
  } catch (error) {
    console.error("Error running code:", error);
    throw error;
  }
};
