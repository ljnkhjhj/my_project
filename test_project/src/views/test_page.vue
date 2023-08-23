<template>
  <h1>Đề thi được tạo ở đây</h1>
</template>
<script>
import { HTTP } from "@/service/axios";

export default {
  data() {
    return {
      kanji: [], //khai báo biến
    };
  },
  //đây là hàm khởi tạo, xem life cycle sẽ hiểu hơn
  created() {
    this.getKanji();
  },
  methods: {
    //cách viết hàm
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
