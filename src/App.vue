<template>
    <div id="container">
        <p>{{initData}}</p>
        <div id="banner_video"></div>
    </div>
</template>

<script>
    export default {
        name: "App",
        data() {
            return {
                initData: 'Vue构建成功'
            }
        },
        created() {
            this.init();
        },
        methods: {
            init() {
                var myAd199081 = Vijs.setAD({
                    unitid: 199081,
                    view: 285,
                    placeholderid: 'banner_video',
                    loadedCallback: function() {
                        console.log('success done');
                    }
                });
                myAd199081.show();
            }
        }
    }
</script>

<style scoped>
 #container {
     color: black;
 }
</style>
