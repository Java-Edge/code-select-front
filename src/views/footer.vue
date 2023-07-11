<template>
    <el-footer class="footer" height="200px">
        <div class="footer-content">
            <div class="footer-left">
                <h3 class="footer-title">{{ websiteName }}</h3>
                <p class="footer-copyright">
                    &copy; {{ currentYear }} {{ websiteName }}. All rights reserved.
                </p>
            </div>
            <div class="footer-right">
                <p class="footer-contact">
                    Contact us: <span class="footer-phone">{{ contactPhone }}</span>
                </p>
            </div>
        </div>
    </el-footer>
</template>
  
<script>
export default {
    name: 'Footer',
    data() {
        return {
            websiteName: 'JAVA',
            contactPhone: '123-456-7890',
        };
    },
    computed: {
        currentYear() {
            return new Date().getFullYear();
        },
    },
};
</script>
  
<style>

.footer {
    background-color: #f5f5f5;
    padding: 20px;
    text-align: center;
    height: 300px;
}

.footer-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.footer-left {
    text-align: left;
}

.footer-title {
    font-size: 24px;
    font-weight: bold;
}

.footer-right {
    text-align: right;
}

.footer-contact {
    font-size: 14px;
}

.footer-phone {
    color: #007bff;
}
</style>
  