<template>
  <section id="services" class="services">
    <div class="container-section">
      <h2 class="section-title services__title">{{ serviceSection?.data?.title }}</h2>

      <div class="services__grid">
        <article v-for="service in servicesCard?.data" :key="service.title" class="services__card">
          <div
            v-if="service?.image?.formats?.thumbnail"
            class="services__image"
            :style="{ backgroundImage: `url(${apiEndpoint}${service?.image?.formats?.thumbnail?.url})` }"
          />
          <div
            v-else
            class="services__image"
            :style="{ backgroundImage: `url(${apiEndpoint}${service?.image?.formats?.small?.url})` }"
          />
          <div class="services__body">
            <h3>{{ service.title }}</h3>
            <p>{{ service.description }}</p>
            <span class="services__indicator" />
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const currentLocale = useState<string>("locale", () => "ru");
const apiEndpoint = useRuntimeConfig().public.apiEndpoint;

const { data: serviceSection } = await useAsyncData(
  `serviceSection-${currentLocale.value}`,
  () => strapi.getServiceSection(currentLocale.value),
  {
    watch: [currentLocale],
  }
);

const { data: servicesCard } = await useAsyncData(
  `servicesCard-${currentLocale.value}`,
  () => strapi.getServicesCards(currentLocale.value),
  {
    watch: [currentLocale],
  }
);
</script>

<style scoped>
.services {
  padding-block: clamp(4.5rem, 10vw, 6rem);
  background: #fff;
}

.services__title {
  text-align: center;
}

.services__grid {
  margin-top: clamp(2.5rem, 7vw, 3rem);
  display: grid;
  gap: 1.5rem;
}

.services__card {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: 1.1rem;
  border: 1px solid var(--color-neutral-200);
  background: #fff;
  box-shadow: 0 15px 35px rgba(20, 20, 20, 0.07);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.services__card:hover {
  transform: translateY(-6px);
  box-shadow: 0 28px 55px rgba(199, 97, 39, 0.2);
}

.services__image {
  height: clamp(180px, 28vw, 240px);
  background-size: cover;
  background-position: center;
  transition: transform 0.3s ease;
}

.services__card:hover .services__image {
  transform: scale(1.04);
}

.services__body {
  padding: clamp(1.3rem, 3vw, 1.6rem);
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.services__body h3 {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
}

.services__body p {
  margin: 0;
  color: #1f1f1f;
  font-size: 0.98rem;
  line-height: 1.6;
}

.services__indicator {
  width: 3rem;
  height: 4px;
  border-radius: 999px;
  background: rgba(199, 97, 39, 0.25);
  transition: background-color 0.2s ease, transform 0.25s ease;
}

.services__card:hover .services__indicator {
  background: var(--color-copper);
  transform: scaleX(1.1);
}

@media (min-width: 768px) {
  .services__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1024px) {
  .services__grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}
</style>
