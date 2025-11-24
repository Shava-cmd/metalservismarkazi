<template>
  <section id="about" class="about">
    <div class="container-section">
      <h2 class="section-title about__title">{{ aboutSection?.data?.title }}</h2>

      <div class="about__text">
        <p v-html="DOMPurify.sanitize(aboutSection?.data?.text || '')"></p>
      </div>

      <div class="about__grid">
        <article v-for="feature in aboutCards?.data" :key="feature.documentId" class="about__card">
          <h3 class="about__card-title">{{ feature.title }}</h3>
          <p class="about__card-text">{{ feature.description }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import DOMPurify from "dompurify";

const currentLocale = useState<string>("locale");

const { data: aboutSection } = await useAsyncData(
  `aboutSection-${currentLocale.value}`,
  () => strapi.getAboutSection(currentLocale.value),
  {
    watch: [currentLocale],
  }
);

const { data: aboutCards } = await useAsyncData(
  `aboutCards-${currentLocale.value}`,
  () => strapi.getAboutCards(currentLocale.value),
  {
    watch: [currentLocale],
  }
);
</script>

<style scoped>
.about {
  /* padding-block: clamp(4rem, 10vw, 5.5rem); */
  padding-top: 2rem;
  padding-bottom: 1rem;
  background: #fff;
}

.about__title {
  text-align: center;
}

.about__text {
  margin-top: 2rem;
  display: grid;
  gap: 1.5rem;
  max-width: 880px;
  margin-inline: auto;
  color: #1f1f1f;
  font-size: clamp(1rem, 2.4vw, 1.15rem);
  line-height: 1.7;
}

.about__grid {
  display: grid;
  gap: 1.5rem;
  margin-top: clamp(3rem, 8vw, 4rem);
}

.about__card {
  border: 1px solid var(--color-neutral-200);
  border-radius: 1rem;
  padding: clamp(1.25rem, 3vw, 1.8rem);
  background: #fff;
  box-shadow: 0 12px 30px rgba(20, 20, 20, 0.06);
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}

.about__card:hover {
  transform: translateY(-4px);
  border-color: rgba(199, 97, 39, 0.8);
  box-shadow: 0 22px 45px rgba(199, 97, 39, 0.18);
}

.about__card-title {
  margin: 0;
  font-weight: 600;
  font-size: 1.25rem;
}

.about__card-text {
  margin: 0.75rem 0 0;
  color: #1f1f1f;
  font-size: 1rem;
}

@media (min-width: 768px) {
  .about__grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

@media (min-width: 640px) and (max-width: 767px) {
  .about__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
