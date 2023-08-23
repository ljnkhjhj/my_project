<template>
  <el-header>
    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      background-color="rgb(78, 200, 153)"
      text-color="black"
      active-text-color="#224e3e"
    >
      <el-menu-item index="1">Home</el-menu-item>
      <el-sub-menu index="2">
        <template #title>Thematic</template>
        <el-menu-item index="2-1">Kanji</el-menu-item>
        <el-menu-item index="2-2">Hiragana</el-menu-item>
      </el-sub-menu>
      <el-menu-item index="1">Account</el-menu-item>
    </el-menu>
  </el-header>
</template>
