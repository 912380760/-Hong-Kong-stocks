<template>
  <div class="about">
    <h1>This is an about page</h1>

    <p>
      The term
      <abbr title="这是一个提示文本">SCUBA</abbr>
      is an acronym rather than an abbreviation as it is pronounced as a word.
    </p>
  </div>
</template>

<script>
// 男人出正面的概率为x, 女人出正面的概率为y; x1
let x = 0,y = 0.36;
let arr = [];

for(let j = 0; j < 100; j++) {
  x += 0.01;
  let z = 0;
  for(let i=0; i<1000000; i++) {
    if (Math.random() <= x && Math.random() <= y) {
      z += 3;
    } else if (Math.random() > x && Math.random() > y) {
      z += 1;
    } else {
      z -= 2;
    }
  }
  arr.push(z);
}


function test(x, y = 0.36) {
  let z = 0;
  for(let i=0; i<1000000; i++) {
    if (Math.random() <= x && Math.random() <= y) {
      z += 3;
    } else if (Math.random() > x && Math.random() > y) {
      z += 1;
    } else {
      z -= 2;
    }
  }
  console.log(z);
  return z;
}
test(0.5)


console.log(arr);



export default {
  data() {

  },
  filters: {

  },
  watch: {

  },
  methods: {

  },
  mounted() {

  }
}
</script>

<style>
abbr[title] {
  border-bottom: 1px dotted #999;
}
abbr[title]:hover {
  cursor: help;
}
</style>