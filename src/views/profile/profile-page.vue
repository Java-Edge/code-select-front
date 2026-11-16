<template>
  <div class="profile-page">
    <div class="profile-card">
      <div class="profile-header">
        <div class="avatar-editor">
          <img v-if="avatar" :src="avatar" class="profile-avatar" alt="avatar" />
          <div v-else class="profile-avatar default">{{ displayName.charAt(0) || 'U' }}</div>
          <button
            class="avatar-upload-button"
            type="button"
            :disabled="uploading"
            :title="uploading ? '正在上传头像' : '点击上传头像'"
            @click="openFilePicker"
          >
            {{ uploading ? '上传中…' : '更换头像' }}
          </button>
          <input
            ref="fileInput"
            class="avatar-file-input"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            @change="handleFileChange"
          />
        </div>
        <div class="profile-meta">
          <h2 class="profile-name">{{ displayName }}</h2>
          <p class="avatar-hint">支持 JPG、PNG、WEBP，最大 5MB</p>
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
          <div class="info-item">
            <span class="info-label">成长积分</span>
            <span class="info-value">{{ growthPoints }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">会员等级</span>
            <span class="info-value">Lv.{{ growthLevel }}</span>
          </div>
        </div>
      </div>

      <div class="profile-actions">
        <el-button type="danger" plain @click="handleLogout">退出登录</el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, defineOptions, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { ElMessageBox } from 'element-plus/es/components/message-box'
import { ElMessage } from 'element-plus/es/components/message'

defineOptions({
  name: 'ProfilePage'
})

const store = useStore()
const router = useRouter()
const fileInput = ref<HTMLInputElement | null>(null)
const uploading = ref(false)

const userInfo = computed(() => store.getters['user/userInfo'])
const username = computed(() => store.getters['user/username'])
const nickname = computed(() => store.getters['user/nickname'])
const avatar = computed(() => store.getters['user/avatar'])
const growthPoints = computed(() => store.getters['user/growthPoints'] ?? 0)
const growthLevel = computed(() => store.getters['user/growthLevel'] ?? 1)

const displayName = computed<string>(() => nickname.value || username.value || '用户')

const openFilePicker = (): void => {
  fileInput.value?.click()
}

const handleFileChange = async (event: Event): Promise<void> => {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  input.value = ''
  if (!file) {
    return
  }
  if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
    ElMessage.error('头像仅支持 JPG、PNG、WEBP 格式')
    return
  }
  if (file.size > 5 * 1024 * 1024) {
    ElMessage.error('头像大小不能超过 5MB')
    return
  }

  uploading.value = true
  try {
    await store.dispatch('user/updateAvatar', file)
    ElMessage.success('头像更新成功')
  } catch (error) {
    const message = error instanceof Error ? error.message : '头像上传失败，请重试'
    ElMessage.error(message)
  } finally {
    uploading.value = false
  }
}

// 进入个人中心即拉取最新成长快照（覆盖刷新后 state 未持久化场景）
onMounted(() => {
  store.dispatch('user/fetchGrowth').catch(() => {})
})

const handleLogout = async (): Promise<void> => {
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

.avatar-editor {
  position: relative;
  flex-shrink: 0;
  width: 80px;
}

.avatar-upload-button {
  position: absolute;
  left: 50%;
  bottom: -12px;
  transform: translateX(-50%);
  min-width: 88px;
  padding: 5px 10px;
  border: 1px solid var(--el-color-primary);
  border-radius: 999px;
  background: var(--el-color-primary);
  color: #fff;
  font-size: 12px;
  line-height: 16px;
  white-space: nowrap;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
}

.avatar-file-input {
  display: none;
}

.profile-meta {
  .profile-name {
    margin: 0;
    font-size: 22px;
    font-weight: 600;
    color: #1c1f21;
  }

  .avatar-hint {
    margin: 8px 0 0;
    color: #9199a1;
    font-size: 13px;
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
