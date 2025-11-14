<template>
  <section id="gallery" class="gallery">
    <div class="container-section">
      <h2 class="section-title gallery__title">{{ gallerySection?.data?.title }}</h2>

      <div class="gallery__wrapper">
        <button class="gallery__control" type="button" aria-label="Назад" @click="prevSlide">⟵</button>

        <div class="gallery__stage">
          <TransitionGroup name="fade" tag="div" class="gallery__slides">
            <div
              v-if="currentImage"
              :key="currentImage"
              class="gallery__slide"
              :style="{ backgroundImage: `url(${currentImage})` }"
            />
          </TransitionGroup>
        </div>

        <button class="gallery__control" type="button" aria-label="Вперёд" @click="nextSlide">⟶</button>
      </div>

      <div class="gallery__dots">
        <button
          v-for="(photo, index) in images"
          :key="photo"
          :class="['gallery__dot', { 'gallery__dot--active': index === activeIndex }]"
          type="button"
          aria-label="Перейти к изображению"
          @click="goTo(index)"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const currentLocale = useState<string>("locale", () => "ru");
const apiEndpoint = useRuntimeConfig().public.apiEndpoint;

const { data: gallerySection } = await useAsyncData(
  `gallerySection-${currentLocale.value}`,
  () => strapi.getGallerySection(currentLocale.value),
  {
    watch: [currentLocale],
  }
);

const images = gallerySection.value?.data?.images?.map((img) => `${apiEndpoint}${img.url}`) || [];
const activeIndex = ref(0);
const intervalId = ref<number | null>(null);

const currentImage = computed(() => images[activeIndex.value]);

const nextSlide = () => {
  activeIndex.value = (activeIndex.value + 1) % images.length;
};

const prevSlide = () => {
  activeIndex.value = (activeIndex.value - 1 + images.length) % images.length;
};

const goTo = (index: number) => {
  activeIndex.value = index;
  resetTimer();
};

const startTimer = () => {
  stopTimer();
  intervalId.value = window.setInterval(() => {
    nextSlide();
  }, 5000);
};

const stopTimer = () => {
  if (intervalId.value) {
    clearInterval(intervalId.value);
    intervalId.value = null;
  }
};

const resetTimer = () => {
  stopTimer();
  startTimer();
};

onMounted(() => {
  startTimer();
});

onBeforeUnmount(() => {
  stopTimer();
});
</script>

<style scoped>
.gallery {
  padding-block: clamp(4.5rem, 10vw, 6rem);
  background: #fff;
}

.gallery__title {
  text-align: center;
}

.gallery__wrapper {
  margin-top: clamp(2rem, 6vw, 3rem);
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 1rem;
  align-items: center;
}

.gallery__control {
  width: clamp(50px, 10vw, 60px);
  height: clamp(50px, 10vw, 60px);
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: rgba(30, 30, 30, 0.8);
  color: #fff;
  font-size: 1.25rem;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.2s ease;
}

.gallery__control:hover {
  background: rgba(199, 97, 39, 0.95);
  transform: scale(1.05);
}

.gallery__stage {
  position: relative;
  border-radius: 1.5rem;
  border: 1px solid rgba(228, 228, 231, 0.8);
  overflow: hidden;
  background: #0f0f0f;
  aspect-ratio: 16 / 9;
  box-shadow: 0 24px 60px rgba(15, 15, 15, 0.4);
}

.gallery__slides {
  position: relative;
  width: 100%;
  height: 100%;
}

.gallery__slide {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
}

.gallery__dots {
  margin-top: clamp(1.5rem, 4vw, 2.2rem);
  display: flex;
  justify-content: center;
  gap: 0.6rem;
  flex-wrap: wrap;
}

.gallery__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.45);
  cursor: pointer;
  transition: transform 0.2s ease, background-color 0.2s ease;
}

.gallery__dot--active {
  background: var(--color-copper);
  transform: scale(1.2);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 640px) {
  .gallery__wrapper {
    grid-template-columns: 1fr;
  }

  .gallery__control {
    order: -1;
    justify-self: center;
  }

  .gallery__control:last-of-type {
    order: 1;
  }
}
</style>
