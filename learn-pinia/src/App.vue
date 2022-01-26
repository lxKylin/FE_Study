<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Vue 3 + TypeScript + Vite + Pinia" />
  <div>
    {{ userStore.name }}
  </div>
  <div>
    {{ name }}
  </div>
  <button @click="updateName">修改名称</button>
  <div>
    {{ userStore.count }}
  </div>
  <div>
    {{ count }}
  </div>
  <div>
    {{ double }}
  </div>
  <button @click="increment">+1</button>
  
</template>

<script setup lang="ts">
import { computed } from 'vue';

import HelloWorld from './components/HelloWorld.vue'

import { useUserStore } from '@/store/user';

// 1
const userStore = useUserStore()

// 2
// const name = computed(() => userStore.name)
const count = computed(() => userStore.count)
const double = computed(() => userStore.double)

// 3 解构 使用pinia自带的storeToRefs防止失去响应式
import { storeToRefs } from 'pinia';
const { name } = storeToRefs(userStore)

// 改名称
const updateName = () => {
  userStore.updateName('Arms')
}

// 进行+1操作
const increment = () => { 
  userStore.addCount() 
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
