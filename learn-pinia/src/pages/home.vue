<template>
  <div>
    <h1>Home</h1>
    <div>{{ userStore.name }} {{ name }}</div>

    <button @click="updateName">修改名称</button>
    <div>
      {{ userStore.count }}
      {{ count }}
      {{ double }}
    </div>

    <button @click="increment">+1</button>

    <div>{{ userStore.list[0] }}</div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useUserStore } from '@/store/user';

// 1
const userStore = useUserStore();

// 2
// const name = computed(() => userStore.name)
const count = computed(() => userStore.count);
const double = computed(() => userStore.double);

// 3 解构 使用pinia自带的storeToRefs防止失去响应式
import { storeToRefs } from 'pinia';
const { name } = storeToRefs(userStore);

// 改名称
const updateName = () => {
  userStore.updateName('Arms');
};

// 进行+1操作
const increment = () => {
  userStore.addCount();
};

/**
 * $patch 修改state的值 也可更改多个值
 * 两种方式：
 * 1: patch + 函数
 * 2: patch + 对象
 */
userStore.$patch((state) => {
  state.list[0].age = 18;
  state.list[0].name = '小刘同学';
});

// 监听订阅state
const subscribe = userStore.$subscribe((mutation, state) => {
  console.log(mutation);
  console.log(state);
});
</script>

<style lang="less" scoped></style>
