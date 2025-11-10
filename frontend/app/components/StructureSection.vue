<template>
  <section id="structure" class="structure">
    <div class="container-section">
      <h2 class="section-title structure__title">{{ structureSection?.data?.title }}</h2>

      <div class="structure__scroller" @mouseenter="paused = true" @mouseleave="paused = false">
        <div :class="['structure__track', 'marquee-track', { 'marquee-paused': paused }]">
          <article v-for="item in duplicatedItems" :key="item.uid" class="structure__card">
            <h3>{{ item.title }}</h3>
            <p>{{ item.description }}</p>
            <span class="structure__indicator" />
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

const currentLocale = useState<string>("locale", () => "ru");

const { data: structureSection } = await useAsyncData(
  `structureSection-${currentLocale.value}`,
  () => strapi.getStructureSection(currentLocale.value),
  {
    watch: [currentLocale],
  }
);

const { data: structureCard } = await useAsyncData(
  `structureCard-${currentLocale.value}`,
  () => strapi.getStructureCards(currentLocale.value),
  {
    watch: [currentLocale],
  }
);

const items = computed(() => structureCard.value?.data || []);

const paused = ref(false);
const duplicatedItems = computed(() =>
  [...items.value, ...items.value].map((entry, index) => ({ ...entry, uid: `${entry.title}-${index}` }))
);
</script>

<style scoped>
.structure {
  padding-block: clamp(4.5rem, 10vw, 6rem);
  background: #fff;
}

.structure__title {
  text-align: center;
}

.structure__scroller {
  margin-top: clamp(2.5rem, 7vw, 3rem);
  overflow: hidden;
  border-radius: 1.5rem;
  border: 1px solid rgba(228, 228, 231, 0.75);
  padding-block: clamp(1.2rem, 3vw, 1.6rem);
  padding-inline: 0;
  background: #fff;
}

.structure__track {
  display: flex;
  gap: 1.5rem;
  padding-inline: clamp(1.5rem, 4vw, 2.25rem);
  animation-duration: 28s;
}

.structure__card {
  min-width: clamp(260px, 40vw, 320px);
  max-width: clamp(260px, 40vw, 320px);
  border-radius: 1.1rem;
  border: 1px solid var(--color-neutral-200);
  padding: clamp(1.3rem, 3vw, 1.7rem);
  background: #fff;
  box-shadow: 0 16px 40px rgba(15, 15, 15, 0.08);
  transition: border-color 0.2s ease, transform 0.2s ease;
}

.structure__card:hover {
  border-color: rgba(199, 97, 39, 0.85);
  transform: translateY(-5px);
}

.structure__card h3 {
  margin: 0;
  font-size: 1.15rem;
  font-weight: 600;
}

.structure__card p {
  margin: 0.9rem 0 0;
  color: #1f1f1f;
  font-size: 0.98rem;
  line-height: 1.6;
}

.structure__indicator {
  display: block;
  width: 2.8rem;
  height: 4px;
  border-radius: 999px;
  background: rgba(199, 97, 39, 0.25);
  margin-top: 1.2rem;
  transition: background-color 0.2s ease;
}

.structure__card:hover .structure__indicator {
  background: var(--color-copper);
}
</style>
