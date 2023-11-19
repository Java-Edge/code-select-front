<template>
    <div class="container">
        <ul class="display-flex">
            <li>
                <img style="--i:1" src="@/assets/images/1.jpg"/>
            </li>
            <li>
                <img style="--i:2" src="@/assets/images/2.jpg"/>
            </li>
            <li>
                <img style="--i:3" src="@/assets/images/3.png"/>
            </li>
            <li>
                <img style="--i:4" src="@/assets/images/4.jpg"/>
            </li>
            <li>
                <img style="--i:5" src="@/assets/images/5.jpg"/>
            </li>
            <li>
                <img style="--i:6" src="@/assets/images/6.png"/>
            </li>
            <li>
                <img style="--i:7" src="@/assets/images/7.png"/>
            </li>
            <li>
                <img style="--i:8" src="@/assets/images/8.png"/>
            </li>
            <li>
                <img style="--i:9" src="@/assets/images/9.jpeg"/>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    setup () {
        

        return {}
    }
}
</script>

<style lang="scss" scoped>
.container{
    margin-left: 300px;
    position: relative;
}
.container ul li{
    perspective: 500px;
    
}
.container ul li img{
    width: 400px;
    height: 300px;
}
.container ul li:nth-child(1) img{
   
    transform: rotateY(30deg) scale(0.95) translate3d(-30px, 50px, 0);
}
.container ul li:nth-child(2) img{
   
   transform: rotateY(30deg) scale(0.7) translate3d(-310px, 45px, 0);
}
.container ul li:nth-child(3) img{
   
   transform: rotateY(30deg) scale(0.65) translate3d(-480px, 45px, 0);
}
.container ul li:nth-child(4) img{
   
   transform: rotateY(30deg) scale(0.6) translate3d(-640px, 45px, 0);
}
.container ul li:nth-child(5) img{
   
   transform: rotateY(30deg) scale(0.55) translate3d(-820px, 45px, 0);
}
.container ul li:nth-child(6) img{
   
   transform: rotateY(30deg) scale(0.5) translate3d(-1000px, 45px, 0);
}
.container ul li:nth-child(7) img{
   
   transform: rotateY(30deg) scale(0.45) translate3d(-1200px, 45px, 0);
}

.container ul li:nth-child(8) img{
    width: 400px;
    height: 300px;
   transform: rotateY(30deg) scale(0.4) translate3d(-1450px, 45px, 0);
}
.container ul li:nth-child(9) img{
   
   transform: rotateY(0) scale(1.1) translate3d(-1350px, 40px, 0);
}

</style>