<template>
  <div>
    <div id="drag-source" draggable>
      <div class="image" style="border: 1px solid #ccc">
        <img alt="Vue logo" src="./assets/logo.png" />
        <img alt="Vue logo" src="./assets/logo.png" />
      </div>
    </div>
    <div>
      <button @click="home">home</button>
      <button @click="about">about</button>
    </div>
  </div>
  <div>
    <div class="test" draggable>测试拖拽</div>
  </div>

  <div class="container">
    <div id="text-source" class="main">
      <router-view></router-view>
    </div>
    <div id="drop-target-1" class="main">
      <div>拖放区</div>
    </div>
  </div>
  <div class="container">
    <div id="drop-target-2" class="main">
      <div>拖放区</div>
    </div>
    <div id="drop-target-3" class="main">
      <div>拖放区</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

// router
const router = useRouter();
const route = useRoute();

const home = () => {
  router.push('/home');
};
const about = () => {
  router.push({ path: '/about' });
};

// 拖动目标的dragstart事件处理函数
const handleDragStart = (event) => {
  // 设置传输的数据类型和值
  event.dataTransfer.setData('text/plain', event.target.src);
};

// 放置目标的drop事件处理函数
const handleDrop = (event) => {
  // 获取传输的数据
  var imageUrl = event.dataTransfer.getData('text/plain');
  console.log(imageUrl, 'imageUrl');

  var imageElement = document.createElement('img');
  imageElement.src = imageUrl;

  const dropTarget = document.getElementById('drop-target-1');
  console.log(imageElement, 'imageElement');
  // 将图片元素添加到目标区域中
  dropTarget.appendChild(imageElement);
};

// 阻止放置目标的dragover事件默认行为
const handleDragOver = (event) => {
  event.preventDefault();
};

onMounted(() => {
  // 添加事件监听器
  const dragSource = document.getElementById('drag-source');
  const dropTarget = document.getElementById('drop-target-1');
  dragSource.addEventListener('dragstart', handleDragStart);
  dropTarget.addEventListener('drop', handleDrop);
  dropTarget.addEventListener('dragover', handleDragOver);
});
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
.container {
  display: flex;
}
.main {
  border: 1px solid #ccc;
  width: 50%;
}
</style>
