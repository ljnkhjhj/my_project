<template>
  <div class="row">
    <div class="col-md-3"></div>
    <div class="col-md-9">
      <div class="col section">
        <h1>Set up your Kanji exam</h1>
        <h5>Choose a time to do exam:</h5>
        <el-form>
          <el-form-item>
            <el-radio-group v-model="radio1">
              <el-radio label="10 mins" />
              <el-radio label="20 mins" />
              <el-radio label="30 mins" />
            </el-radio-group>
          </el-form-item>
        </el-form>
        <h5>Choose number of question:</h5>
        <el-form>
          <el-form-item>
            <el-radio-group v-model="radio2">
              <el-radio label="10 questions" />
              <el-radio label="20 questions" />
              <el-radio label="25 questions" />
              <el-radio label="30 questions" />
            </el-radio-group>
          </el-form-item>
          <el-button type="primary" @click="redirectToPageB">
            Start your exam
          </el-button>
        </el-form>
      </div>
      <slot />
    </div>
  </div>
</template>

<script>
import { HTTP } from "@/service/axios";

export default {
  data() {
    return {
      radio1: null,
      radio2: null,
      kanji: [],
    };
  },
  created() {
    this.getKanji();
  },
  methods: {
    redirectToPageB() {
      let timeInMinutes = 0;
      let numberOfQuestions = 0;

      if (this.radio1 === "10 mins") {
        timeInMinutes = 10;
      } else if (this.radio1 === "20 mins") {
        timeInMinutes = 20;
      } else if (this.radio1 === "30 mins") {
        timeInMinutes = 30;
      }

      if (this.radio2 === "10 questions") {
        numberOfQuestions = 10;
      } else if (this.radio2 === "20 questions") {
        numberOfQuestions = 20;
      } else if (this.radio2 === "25 questions") {
        numberOfQuestions = 25;
      } else if (this.radio2 === "30 questions") {
        numberOfQuestions = 30;
      }

      if (timeInMinutes === 0 || numberOfQuestions === 0) {
        alert(
          "Please select both the time and number of questions before starting the exam."
        );
      } else {
        this.$router.push({
          name: "yourExam",
          query: {
            time: timeInMinutes,
            questions: numberOfQuestions,
          },
        });
      }
    },

    async getKanji() {
      await HTTP.get("kanji/")
        .then((res) => {
          this.kanji = res.data;
          console.log(this.kanji);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style>
.el-button--primary {
  background-color: rgb(78, 200, 153);
  border-color: rgb(78, 200, 153);
}
.el-button--primary:hover {
  background-color: #224e3e;
  border-color: #224e3e;
}
</style>
