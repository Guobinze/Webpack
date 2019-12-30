<template>
    <div id="container">
        <p>{{initData}}</p>
    </div>
</template>

<script>
    export default {
        name: "App",
        data() {
            return {
                initData: 'Vue构建成功'
            }
        }
    }
</script>

<style scoped>
 #container {
     color: black;
 }
</style>
