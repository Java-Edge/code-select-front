<template>
  <div class="lp-page">
    <!-- 面包屑导航 -->
    <nav class="lp-crumb">
      <router-link to="/index" class="crumb-link">首页</router-link>
      <span class="crumb-sep">/</span>
      <span class="crumb-link">学习路线</span>
      <span class="crumb-sep">/</span>
      <span class="crumb-current">{{ heroTitle }}</span>
    </nav>

    <!-- Hero：路线元信息（MySQL 事实源） -->
    <section class="lp-hero">
      <div v-if="heroImg" class="hero-cover">
        <img :src="heroImg" :alt="heroTitle" />
      </div>
      <div class="hero-body">
        <div class="hero-head">
          <h1 class="hero-title">{{ heroTitle }}</h1>
          <el-select
            v-model="selectedId"
            class="hero-select"
            placeholder="选择学习路线"
            :disabled="roadmaps.length === 0"
            @change="onRoadmapChange"
          >
            <el-option
              v-for="item in roadmaps"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            />
          </el-select>
        </div>
        <p v-if="roadmapMeta?.description" class="hero-desc">{{ roadmapMeta.description }}</p>
        <div class="hero-stats">
          <div class="stat">
            <b class="stat-num">{{ steps.length }}</b>
            <span class="stat-label">步骤</span>
          </div>
          <span class="stat-sep" />
          <div class="stat">
            <b class="stat-num">{{ courseCount }}</b>
            <span class="stat-label">关联课程</span>
          </div>
          <span class="stat-sep" />
          <div class="stat">
            <b class="stat-num">{{ collectCount }}</b>
            <span class="stat-label">收藏</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 图查询失败：错误态 + 重试（Neo4j 不可用时不白屏） -->
    <div v-if="loadError" class="lp-error">
      <el-alert :title="loadError" type="error" show-icon :closable="false" />
      <el-button class="retry-btn" size="small" @click="loadPath">重试</el-button>
    </div>

    <!-- 加载态（与 pilot.vue 一致的手动 loading，避免额外注册 v-loading 指令） -->
    <div v-else-if="listLoading || loading" class="lp-loading">
      <el-icon class="is-loading" :size="28"><Loading /></el-icon>
    </div>

    <!-- 空态：路线存在但无步骤 -->
    <el-empty v-else-if="selectedId != null && steps.length === 0" description="该路线暂未配置步骤" />

    <!-- 空态：无可用路线 -->
    <el-empty v-else-if="roadmaps.length === 0" description="暂无可用学习路线" />

    <!-- 主体：Neo4j 图遍历产出的有序步骤（RoadMap-[:NEXT_STEP]->Detail-[:REFERENCES]->Course） -->
    <section v-else class="lp-steps">
      <article v-for="(step, idx) in steps" :key="step.detailId ?? step.seq ?? 0" class="step-card">
        <span class="step-watermark">{{ String(idx + 1).padStart(2, '0') }}</span>
        <header class="step-head">
          <span class="step-badge">STEP {{ String(idx + 1).padStart(2, '0') }}</span>
          <h2 class="step-title">{{ stepTitle(step) }}</h2>
        </header>
        <a
          v-if="step.courseName && step.courseUrl"
          class="course-card"
          :class="step.courseType === 1 ? 'is-column' : 'is-video'"
          :href="step.courseUrl"
          target="_blank"
          rel="noopener noreferrer"
          @click="onCourseClick(step.courseId)"
        >
          <div class="course-icon">
            <el-icon :size="22"><Notebook v-if="step.courseType === 1" /><VideoPlay v-else /></el-icon>
          </div>
          <div class="course-info">
            <div class="course-name">{{ step.courseName }}</div>
            <div class="course-meta">
              <span class="course-type">{{ step.courseType === 1 ? '专栏' : '视频' }}</span>
              <span class="course-id">课程 #{{ step.courseId }}</span>
            </div>
          </div>
          <el-icon class="course-arrow"><ArrowRight /></el-icon>
        </a>
        <div
          v-else-if="step.courseName"
          class="course-card is-static"
          :class="step.courseType === 1 ? 'is-column' : 'is-video'"
          title="该课程暂无链接"
        >
          <div class="course-icon">
            <el-icon :size="22"><Notebook v-if="step.courseType === 1" /><VideoPlay v-else /></el-icon>
          </div>
          <div class="course-info">
            <div class="course-name">{{ step.courseName }}</div>
            <div class="course-meta">
              <span class="course-type">{{ step.courseType === 1 ? '专栏' : '视频' }}</span>
              <span class="course-id">课程 #{{ step.courseId }}</span>
            </div>
          </div>
        </div>
        <div v-else class="course-empty">该步骤暂无关联课程</div>
      </article>
    </section>

    <footer class="lp-footer">
      路线步骤由 Neo4j 图遍历驱动 · 路线元数据来自 MySQL 事实源
    </footer>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowRight, Loading, Notebook, VideoPlay } from '@element-plus/icons-vue'
import { roadmapApi } from '@/api/roadmap'
import type { LearningPathStep, RoadMapSummary } from '@/api/roadmap'

/** 默认展示路线：数据最全的一条龙路线；列表加载后若不存在则回退列表首个 */
const DEFAULT_ROADMAP_ID = 3

const route = useRoute()
const router = useRouter()

const roadmaps = ref<RoadMapSummary[]>([])
const selectedId = ref<number | null>(null)
const roadmapMeta = ref<RoadMapSummary | null>(null)
const steps = ref<LearningPathStep[]>([])
const listLoading = ref(true)
const loading = ref(false)
const loadError = ref<string | null>(null)

const heroTitle = computed(() => roadmapMeta.value?.title ?? '学习路线')
const heroImg = computed(() => roadmapMeta.value?.img ?? '')
const collectCount = computed(() => roadmapMeta.value?.collect ?? 0)
const courseCount = computed(() => steps.value.filter((s) => s.courseId != null).length)

const stepTitle = (step: LearningPathStep): string => step.detailTitle ?? '未命名步骤'

/** 同步 URL query：支持深链接分享、刷新保持（全球用户场景） */
const syncUrl = (id: number): void => {
  router.replace({ query: { ...route.query, roadMapId: String(id) } })
}

const loadPath = async (): Promise<void> => {
  if (selectedId.value == null) return
  loading.value = true
  loadError.value = null
  try {
    const [pathRes, metaRes] = await Promise.all([
      roadmapApi.getLearningPath(selectedId.value),
      roadmapApi.getRoadMapById(selectedId.value)
    ])
    steps.value = pathRes.data.result ?? []
    roadmapMeta.value = metaRes.data.result ?? null
  } catch (err) {
    loadError.value = '学习路线加载失败，请稍后重试'
    console.log('load learning path failed', err)
  } finally {
    loading.value = false
  }
}

const loadRoadmaps = async (): Promise<void> => {
  listLoading.value = true
  try {
    const res = await roadmapApi.getAll()
    const groups = res.data.result ?? {}
    // getAll 的 key=0 是推荐位（limit 3），与分类组存在重复条目，按 id 去重
    const seen = new Set<number>()
    roadmaps.value = Object.values(groups)
      .flat()
      .filter((r) => {
        if (seen.has(r.id)) return false
        seen.add(r.id)
        return true
      })
    if (roadmaps.value.length === 0) return

    // 选中优先级：URL query > 默认路线 > 列表首个
    const queryId = Number(route.query.roadMapId)
    const hitQuery =
      Number.isInteger(queryId) && queryId > 0 && roadmaps.value.some((r) => r.id === queryId)
    const fallback = roadmaps.value.find((r) => r.id === DEFAULT_ROADMAP_ID) ?? roadmaps.value[0]
    selectedId.value = hitQuery ? queryId : fallback.id
    syncUrl(selectedId.value)
    await loadPath()
  } catch (err) {
    console.log('load roadmap list failed', err)
  } finally {
    listLoading.value = false
  }
}

const onRoadmapChange = (id: number): void => {
  selectedId.value = id
  syncUrl(id)
  loadPath()
}

/** 课程卡点击：fire-and-forget 上报浏览量（与专栏卡模式一致），不阻塞外链跳转 */
const onCourseClick = (courseId: number | null): void => {
  if (courseId == null) return
  roadmapApi.bumpCoursePv(courseId).catch(() => {})
}

onMounted(loadRoadmaps)
</script>

<style lang="scss" scoped>
.lp-page {
  max-width: 1152px;
  margin: 0 auto;
  padding: 24px 20px 56px;
}

/* ========== 面包屑 ========== */
.lp-crumb {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--text-muted);
  margin-bottom: 16px;

  .crumb-link {
    color: var(--text-muted);
    text-decoration: none;
    transition: color 0.2s;

    &:hover {
      color: var(--brand-ant);
    }
  }

  .crumb-sep {
    color: var(--gray-300);
  }

  .crumb-current {
    color: var(--gray-700);
    font-weight: 500;
    max-width: 480px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

/* ========== Hero 路线卡 ========== */
.lp-hero {
  display: flex;
  gap: 24px;
  background: var(--gray-50);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 28px;
  margin-bottom: 28px;

  .hero-cover {
    flex-shrink: 0;
    width: 220px;
    height: 132px;
    border-radius: 8px;
    overflow: hidden;
    background: var(--gray-100);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
  }

  .hero-body {
    flex: 1;
    min-width: 0;
  }

  .hero-head {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
    flex-wrap: wrap;
  }

  .hero-title {
    margin: 0;
    font-size: 24px;
    font-weight: 700;
    line-height: 1.3;
    color: var(--gray-900);
  }

  .hero-select {
    width: 260px;
    flex-shrink: 0;
  }

  .hero-desc {
    margin: 10px 0 0;
    font-size: 14px;
    line-height: 1.7;
    color: var(--gray-600);
  }

  .hero-stats {
    display: flex;
    align-items: center;
    margin-top: 18px;

    .stat {
      display: flex;
      align-items: baseline;
      gap: 6px;

      .stat-num {
        font-size: 22px;
        font-weight: 700;
        color: var(--brand-ant);
        font-family: 'DIN Alternate', 'Helvetica Neue', Arial, sans-serif;
      }

      .stat-label {
        font-size: 13px;
        color: var(--gray-500);
      }
    }

    .stat-sep {
      width: 1px;
      height: 16px;
      background: var(--border-color);
      margin: 0 20px;
    }
  }
}

/* ========== 加载 / 错误 ========== */
.lp-loading {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 240px;
}

.lp-error {
  margin-bottom: 24px;

  .retry-btn {
    margin-top: 12px;
  }
}

/* ========== Step 步骤卡 ========== */
.lp-steps {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.step-card {
  position: relative;
  background: var(--white);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 24px 28px 28px;
  overflow: hidden;
  transition: box-shadow 0.25s ease, transform 0.25s ease;

  &:hover {
    box-shadow: 0 12px 24px rgba(17, 24, 39, 0.08);
    transform: translateY(-2px);
  }

  .step-watermark {
    position: absolute;
    right: 12px;
    top: -12px;
    font-size: 96px;
    font-weight: 800;
    line-height: 1;
    color: var(--gray-900);
    opacity: 0.05;
    pointer-events: none;
    user-select: none;
    font-family: 'DIN Alternate', 'Helvetica Neue', Arial, sans-serif;
  }

  .step-head {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 18px;
  }

  .step-badge {
    flex-shrink: 0;
    padding: 4px 12px;
    border-radius: 100px;
    background: linear-gradient(135deg, var(--brand-ant), #40a9ff);
    color: #fff;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.5px;
  }

  .step-title {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    color: var(--gray-900);
  }
}

/* ========== 课程横卡 ========== */
.course-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  border-radius: 8px;
  background: var(--gray-50);
  border: 1px solid var(--border-color);
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  transition: border-color 0.2s ease, background-color 0.2s ease;

  &:hover {
    border-color: var(--brand-ant);

    .course-arrow {
      color: var(--brand-ant);
      transform: translateX(4px);
    }
  }

  /* 无真实链接的课程：静态展示，不可点击 */
  &.is-static {
    cursor: default;

    &:hover {
      border-color: var(--border-color);
    }
  }

  .course-icon {
    flex-shrink: 0;
    width: 48px;
    height: 48px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
  }

  &.is-video .course-icon {
    background: linear-gradient(135deg, var(--brand-ant), #40a9ff);
  }

  &.is-column .course-icon {
    background: linear-gradient(135deg, var(--app-accent), #f6b17a);
  }

  .course-info {
    flex: 1;
    min-width: 0;
  }

  .course-name {
    font-size: 15px;
    font-weight: 600;
    color: var(--gray-800);
    line-height: 1.5;
  }

  .course-meta {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 6px;

    .course-type {
      font-size: 12px;
      padding: 1px 8px;
      border-radius: 4px;
      background: rgba(24, 144, 255, 0.1);
      color: var(--brand-ant);
    }

    .course-id {
      font-size: 12px;
      color: var(--gray-400);
    }
  }

  .course-arrow {
    flex-shrink: 0;
    font-size: 18px;
    color: var(--gray-400);
    transition: color 0.2s ease, transform 0.2s ease;
  }
}

.course-card.is-column .course-meta .course-type {
  background: rgba(233, 142, 70, 0.12);
  color: var(--app-accent);
}

.course-empty {
  padding: 16px;
  border-radius: 8px;
  background: var(--gray-50);
  border: 1px dashed var(--border-color);
  font-size: 13px;
  color: var(--gray-400);
  text-align: center;
}

/* ========== Footer ========== */
.lp-footer {
  margin-top: 36px;
  text-align: center;
  font-size: 12px;
  color: var(--gray-400);
}

/* ========== 暗色适配（编译为 html.dark .xxx[data-v-*]） ========== */
html.dark {
  .lp-crumb {
    color: var(--dm-text-tertiary);

    .crumb-link {
      color: var(--dm-text-tertiary);

      &:hover {
        color: var(--dm-accent-primary-hover);
      }
    }

    .crumb-sep {
      color: var(--dm-border-secondary);
    }

    .crumb-current {
      color: var(--dm-text-secondary);
    }
  }

  .lp-hero {
    background: var(--dm-bg-secondary);
    border-color: var(--dm-border-primary);

    .hero-cover {
      background: var(--dm-bg-tertiary);
    }

    .hero-title {
      color: var(--dm-text-primary);
    }

    .hero-desc {
      color: var(--dm-text-secondary);
    }

    .hero-stats {
      .stat-num {
        color: var(--dm-accent-primary-hover);
      }

      .stat-label {
        color: var(--dm-text-tertiary);
      }

      .stat-sep {
        background: var(--dm-border-primary);
      }
    }
  }

  .step-card {
    background: var(--dm-bg-secondary);
    border-color: var(--dm-border-primary);

    &:hover {
      box-shadow: 0 12px 24px rgba(0, 0, 0, 0.4);
    }

    .step-watermark {
      color: var(--dm-text-primary);
      opacity: 0.06;
    }

    .step-title {
      color: var(--dm-text-primary);
    }
  }

  .course-card {
    background: var(--dm-bg-tertiary);
    border-color: var(--dm-border-primary);

    &:hover {
      border-color: var(--dm-accent-primary);
    }

    &.is-static:hover {
      border-color: var(--dm-border-primary);
    }

    .course-name {
      color: var(--dm-text-primary);
    }

    .course-type {
      background: var(--dm-accent-primary-subtle);
      color: var(--dm-accent-primary-hover);
    }

    .course-id {
      color: var(--dm-text-disabled);
    }

    .course-arrow {
      color: var(--dm-text-disabled);
    }
  }

  .course-card.is-column .course-type {
    background: var(--dm-accent-warning-subtle);
    color: var(--dm-accent-warning);
  }

  .course-empty {
    background: var(--dm-bg-tertiary);
    border-color: var(--dm-border-primary);
    color: var(--dm-text-tertiary);
  }

  .lp-footer {
    color: var(--dm-text-tertiary);
  }
}
</style>
