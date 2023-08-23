<template>
  <div class="row body">
    <div class="col-md-2"></div>
    <div class="col-md-8">
      <h3>Your Kanji exam</h3>
      <div v-for="(question, index) in examQuestions" :key="question.id">
        <p>
          <b>Question {{ index + 1 }}:</b> {{ question.question }}
        </p>
        <el-radio-group v-model="selectedAnswers[index]">
          <el-radio :label="question.answer1">{{ question.answer1 }}</el-radio>
          <el-radio :label="question.answer2">{{ question.answer2 }}</el-radio>
          <el-radio :label="question.answer3">{{ question.answer3 }}</el-radio>
          <el-radio :label="question.answer4">{{ question.answer4 }}</el-radio>
        </el-radio-group>
      </div>
      <div>
        <el-button class="submit-button" type="primary" @click="submitExam"
          >Submit Exam</el-button
        >
      </div>
      <!-- <el-dialog
        title="Exam Result"
        :visible="showResultDialog"
        @update:visible="showResultDialog = $event"
      >
        <p>Your score: {{ score }} / {{ examQuestions.length }}</p>
        <template #footer>
          <el-button @click="closeResultDialog">Close</el-button>
        </template>
      </el-dialog> -->

      <el-dialog
        v-model="showResultDialog"
        title="Kết quả"
        width="30%"
        align-center
      >
        <span>Tổng điểm: {{ score }} / {{ examQuestions.length }}</span>
        <template #footer>
          <span class="dialog-footer">
            <el-button type="primary" @click="showResultDialog = false">
              OK
            </el-button>
          </span>
        </template>
      </el-dialog>
    </div>
    <div class="col-md-2">
      <h4>Countdown Timer</h4>
      <div>
        Time selected: {{ time }} <br />
        Number of questions: {{ questions }}
      </div>
      <div>
        Countdown: <span>{{ formattedCountdown }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { HTTP } from "@/service/axios";

export default {
  data() {
    return {
      time: "",
      questions: "",
      countdown: 0,
      examQuestions: [], // Array to store randomly selected questions
      selectedAnswers: [], // Array to store selected answers for each question
      score: null,
      showResultDialog: false,
    };
  },
  computed: {
    formattedCountdown() {
      const minutes = Math.floor(this.countdown / 60);
      const seconds = this.countdown % 60;
      return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    },
  },
  async mounted() {
    this.getTimeAndQuestionsFromQuery();
    this.startCountdown();
    await this.getKanji(); // Gọi hàm getKanji để lấy dữ liệu câu hỏi từ API
    this.selectRandomQuestions();
  },

  methods: {
    getTimeAndQuestionsFromQuery() {
      if (this.$route.query.time && this.$route.query.questions) {
        this.time = this.$route.query.time;
        this.questions = this.$route.query.questions;
      }
    },
    startCountdown() {
      const durationInSeconds = parseInt(this.time) * 60; // Convert minutes to seconds
      this.countdown = durationInSeconds;

      const interval = setInterval(() => {
        this.countdown--;
        if (this.countdown <= 0) {
          clearInterval(interval);
          // Handle countdown completed
        }
      }, 1000);
    },
    async getKanji() {
      try {
        const response = await HTTP.get("kanji/");
        this.examQuestions = response.data; // Dữ liệu từ API
        this.assignCorrectAnswers(); // Gọi hàm để gán đáp án đúng cho mỗi câu hỏi
        console.log("Kanjiiii", this.examQuestions);
      } catch (error) {
        console.log(error);
      }
    },
    assignCorrectAnswers() {
      for (const question of this.examQuestions) {
        const correctAnswer = question.correct;
        if (correctAnswer === question.answer1) {
          question.correctAnswerIndex = 0;
        } else if (correctAnswer === question.answer2) {
          question.correctAnswerIndex = 1;
        } else if (correctAnswer === question.answer3) {
          question.correctAnswerIndex = 2;
        } else if (correctAnswer === question.answer4) {
          question.correctAnswerIndex = 3;
        }
      }
    },
    selectRandomQuestions() {
      if (this.examQuestions.length > 0) {
        const shuffledQuestions = this.shuffleArray(this.examQuestions);
        this.examQuestions = shuffledQuestions.slice(0, this.questions);
        this.selectedAnswers = new Array(this.questions).fill(null);
      }
    },

    shuffleArray(array) {
      // Implementation of Fisher-Yates Shuffle algorithm
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    },

    async submitExam() {
      // Check if the countdown has reached 0
      if (this.countdown <= 0) {
        const confirmSubmit = await this.$confirm(
          "Thời gian kiểm tra đã kết thúc. Bấm OK để nộp bài.",
          "Hết thời gian",
          {
            confirmButtonText: "OK",
            type: "warning",
          }
        );
        if (confirmSubmit === "confirm") {
          this.calculateAndShowResultDialog();
        }
      } else {
        this.calculateAndShowResultDialog();
      }
    },

    calculateAndShowResultDialog() {
      this.score = this.calculateScore();
      this.showResultDialog = true; // Hiển thị cửa sổ kết quả
    },
    closeResultDialog() {
      this.showResultDialog = false; // Close the result dialog
    },
    calculateScore() {
      let score = 0;

      for (let i = 0; i < this.examQuestions.length; i++) {
        if (this.selectedAnswers[i] === this.examQuestions[i].correct) {
          score++;
        }
      }

      return score;
    },
  },
};
</script>

<style>
.body {
  margin-left: 1cm;
  margin-right: 1cm;
  margin-top: 1cm;
  margin-bottom: 1cm;
}
.question-list {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.question-item {
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  font-weight: bold;
  cursor: pointer;
}
.submit-button {
  color: black;
  background-color: rgb(78, 200, 153);
  border-color: rgb(78, 200, 153);
}
.submit-button:hover {
  background-color: #224e3e; /* Màu nền khi hover */
  border-color: 0;
}
</style>
