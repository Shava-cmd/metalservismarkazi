<template>
  <section id="advantages" class="advantages">
    <div class="container-section">
      <h2 class="section-title advantages__title">{{ advantagesSection?.data?.title }}</h2>

      <div class="advantages__grid">
        <article v-for="advantage in advantagesCards?.data" :key="advantage.documentId" class="advantages__card">
          <span class="advantages__icon" v-html="advantage.icon" />
          <h3>{{ advantage.title }}</h3>
          <p>{{ advantage.description }}</p>
          <span class="advantages__indicator" />
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const currentLocale = useState<string>("locale", () => "ru");

const { data: advantagesSection } = await useAsyncData(
  `advantagesSection-${currentLocale.value}`,
  () => strapi.getAdvantagesSection(currentLocale.value),
  {
    watch: [currentLocale],
  }
);

const { data: advantagesCards } = await useAsyncData(
  `advantagesCards-${currentLocale.value}`,
  () => strapi.getAdvantagesCards(currentLocale.value),
  {
    watch: [currentLocale],
  }
);
</script>

<style scoped>
.advantages {
  padding-block: clamp(4.5rem, 10vw, 6rem);
  background: #fff;
}

.advantages__title {
  text-align: center;
}

.advantages__grid {
  margin-top: clamp(2.5rem, 7vw, 3rem);
  display: grid;
  gap: 1.5rem;
}

.advantages__card {
  position: relative;
  border-radius: 1.5rem;
  border: 1px solid rgba(228, 228, 231, 0.9);
  padding: clamp(1.5rem, 3.5vw, 2.2rem);
  background: #fff;
  box-shadow: 0 18px 48px rgba(15, 15, 15, 0.1);
  transition: transform 0.25s ease, border-color 0.2s ease, box-shadow 0.25s ease;
}

.advantages__card:hover {
  transform: translateY(-6px);
  border-color: rgba(199, 97, 39, 0.85);
  box-shadow: 0 32px 60px rgba(199, 97, 39, 0.22);
}

.advantages__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: clamp(3.2rem, 6vw, 3.8rem);
  height: clamp(3.2rem, 6vw, 3.8rem);
  border-radius: 1.1rem;
  background: rgba(199, 97, 39, 0.1);
  color: var(--color-copper);
  margin-bottom: 1.25rem;
  transition: transform 0.25s ease, background-color 0.25s ease;
}

.advantages__card:hover .advantages__icon {
  transform: scale(1.08);
  background: rgba(199, 97, 39, 0.2);
}

.advantages__icon svg {
  width: clamp(1.5rem, 3vw, 1.75rem);
  height: clamp(1.5rem, 3vw, 1.75rem);
}

.advantages__card h3 {
  margin: 0;
  font-size: 1.15rem;
  font-weight: 600;
}

.advantages__card p {
  margin: 0.8rem 0 0;
  color: var(--color-neutral-600);
  font-size: 0.96rem;
  line-height: 1.6;
}

.advantages__indicator {
  position: absolute;
  left: 1.5rem;
  right: 1.5rem;
  bottom: 1rem;
  height: 3px;
  border-radius: 999px;
  background: rgba(199, 97, 39, 0.25);
  transition: background-color 0.25s ease, width 0.25s ease;
}

.advantages__card:hover .advantages__indicator {
  background: var(--color-copper);
}

@media (min-width: 768px) {
  .advantages__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1200px) {
  .advantages__grid {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }
}
</style>
