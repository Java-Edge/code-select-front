<template>
  <div class="profile-page">
    <div class="profile-card">
      <div class="profile-header">
        <img v-if="avatar" :src="avatar" class="profile-avatar" alt="avatar" />
        <div v-else class="profile-avatar default">{{ displayName.charAt(0) || 'U' }}</div>
        <div class="profile-meta">
          <h2 class="profile-name">{{ displayName }}</h2>
        </div>
      </div>

      <div class="profile-section">
        <h3 class="section-title">账号信息</h3>
        <div class="info-list">
          <div class="info-item">
            <span class="info-label">用户 ID</span>
            <span class="info-value">{{ userInfo?.id || '-' }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">用户名</span>
            <span class="info-value">{{ username || '-' }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">昵称</span>
            <span class="info-value">{{ nickname || '-' }}</span>
          </div>
        </div>
      </div>

      <div class="profile-actions">
        <el-button type="danger" plain @click="handleLogout">退出登录</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, defineOptions } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { ElMessageBox } from 'element-plus/es/components/message-box'

defineOptions({
  name: 'ProfilePage'
})

const store = useStore()
const router = useRouter()

const userInfo = computed(() => store.getters['user/userInfo'])
const username = computed(() => store.getters['user/username'])
const nickname = computed(() => store.getters['user/nickname'])
const avatar = computed(() => store.getters['user/avatar'])

const displayName = computed(() => nickname.value || username.value || '用户')

const handleLogout = async () => {
  try {
    await ElMessageBox.confirm('确定要退出登录吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    await store.dispatch('user/logout')
    router.push('/index')
  } catch (error) {
    // 用户取消
  }
}
</script>

<style lang="scss" scoped>
.profile-page {
  max-width: 1152px;
  margin: 0 auto;
  padding: 32px 16px;
}

.profile-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  padding: 32px;
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 20px;
  padding-bottom: 24px;
  border-bottom: 1px solid #f3f5f6;
}

.profile-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;

  &.default {
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--brand-primary);
    color: #fff;
    font-size: 28px;
    font-weight: 500;
  }
}

.profile-meta {
  .profile-name {
    margin: 0;
    font-size: 22px;
    font-weight: 600;
    color: #1c1f21;
  }
}

.profile-section {
  margin-top: 24px;

  .section-title {
    margin: 0 0 16px;
    font-size: 16px;
    font-weight: 600;
    color: #1c1f21;
  }
}

.info-list {
  .info-item {
    display: flex;
    align-items: center;
    padding: 12px 0;
    border-bottom: 1px solid #f3f5f6;
    font-size: 14px;

    &:last-child {
      border-bottom: none;
    }

    .info-label {
      width: 80px;
      color: #9199a1;
    }

    .info-value {
      flex: 1;
      color: #1c1f21;
    }
  }
}

.profile-actions {
  margin-top: 32px;
  display: flex;
  justify-content: flex-end;
}
</style>
