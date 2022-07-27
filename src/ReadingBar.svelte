<svelte:options tag="reading-bar" />

<script>
  import { onMount } from 'svelte';

  export let selector;
  export let height = '4px';
  export let background = 'linear-gradient(to right, #4169e1, #c6d2f6)';

  let scrolled = 0;

  onMount(async () => {
    selector = selector ? document.querySelector(selector) : document.documentElement;
    handleScroll()
  });

  const clamp = (number, minValue, maxValue) => Math.min(Math.max(number, minValue), maxValue)

  // const debounce = (func, wait, immediate) => {
  //   let timeout;
  //   return () => {
  //     let args = arguments;
  //     clearTimeout(timeout);
  //     timeout = setTimeout(() => {
  //       timeout = null;
  //       if (!immediate) func(args);
  //     }, wait);
  //     if (immediate && !timeout) func(args);
  //   };
  // };

  const handleScroll = (event) => {
    const {clientHeight} = document.documentElement;
    const {height, bottom} = selector.getBoundingClientRect();
    scrolled = clamp((height - bottom + clientHeight)*100/height, 0, 100);
  };

</script>

<!-- <svelte:window on:scroll={debounce(handleScroll, 100)} on:resize={debounce(handleScroll, 100)}/> -->
<svelte:window on:scroll={handleScroll} on:resize={handleScroll}/>

<div class="bar" style:height><span style:background style:width="{scrolled}%"></span></div>

<style>
  .bar {
    position: fixed; top: 0; left: 0; z-index: 999;
    width: 100%;
  }
  div > span {
    display: block;
    height: 100%;
    width: 0;
    background: linear-gradient(to right, #4169e1, #c6d2f6);
  }
</style>
