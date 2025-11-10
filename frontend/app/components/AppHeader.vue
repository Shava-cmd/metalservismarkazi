<template>
  <header :class="['site-header', { 'site-header--scrolled': isScrolled }]">
    <div class="container-section site-header__inner">
      <button class="site-header__logo" type="button" @click="scrollToSection('hero')">MSM</button>

      <nav class="site-header__nav">
        <button
          v-for="item in navItems?.data"
          :key="item.navID"
          class="site-header__nav-link"
          type="button"
          @click="scrollToSection(item.navID)"
        >
          {{ item.label }}
        </button>
      </nav>

      <div class="site-header__actions">
        <div class="site-header__locale">
          <button
            v-for="option in locales"
            :key="option.code"
            :class="['site-header__locale-btn', { 'site-header__locale-btn--active': option.code === currentLocale }]"
            type="button"
            @click="setLocale(option.code)"
          >
            {{ option.label.toUpperCase() }}
          </button>
        </div>

        <button class="site-header__menu" type="button" @click="toggleMobile">
          <svg v-if="mobileOpen" aria-hidden="true" fill="none" height="24" viewBox="0 0 24 24" width="24">
            <path d="M18 6 6 18" stroke="currentColor" stroke-linecap="round" stroke-width="2" />
            <path d="M6 6 18 18" stroke="currentColor" stroke-linecap="round" stroke-width="2" />
          </svg>
          <svg v-else aria-hidden="true" fill="none" height="24" viewBox="0 0 24 24" width="24">
            <path d="M4 5h16" stroke="currentColor" stroke-linecap="round" stroke-width="2" />
            <path d="M4 12h16" stroke="currentColor" stroke-linecap="round" stroke-width="2" />
            <path d="M4 19h16" stroke="currentColor" stroke-linecap="round" stroke-width="2" />
          </svg>
        </button>
      </div>
    </div>

    <transition name="fade">
      <div v-if="mobileOpen" class="site-header__overlay" @click="mobileOpen = false" />
    </transition>

    <nav :class="['site-header__mobile', { 'site-header__mobile--open': mobileOpen }]">
      <div class="container-section">
        <button
          v-for="item in navItems?.data"
          :key="item.navID"
          class="site-header__mobile-link"
          type="button"
          @click="scrollToSection(item.navID)"
        >
          {{ item.label }}
        </button>

        <div class="site-header__mobile-locale">
          <button
            v-for="option in locales"
            :key="option.code"
            :class="[
              'site-header__mobile-locale-btn',
              { 'site-header__mobile-locale-btn--active': option.code === currentLocale },
            ]"
            type="button"
            @click="setLocale(option.code)"
          >
            {{ option.label.toUpperCase() }}
          </button>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import strapi from "@/utils/strapi";

const locales = [
  { code: "ru", label: "РУ" },
  { code: "uz-Cyrl", label: "ЎЗ" },
];
const currentLocale = useState<string>("locale", () => locales[0]?.code || "ru");

const { data: navItems } = await useAsyncData(
  `navs-${currentLocale.value}`,
  () => strapi.getNavItems(currentLocale.value),
  {
    watch: [currentLocale],
  }
);

const isScrolled = ref(false);
const mobileOpen = ref(false);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 60;
};

const scrollToSection = (id: string) => {
  const target = document.getElementById(id);
  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  mobileOpen.value = false;
};

const toggleMobile = () => {
  mobileOpen.value = !mobileOpen.value;
};

const setLocale = (value: string) => {
  currentLocale.value = value;
  if (import.meta.client) localStorage.setItem("lang", value);
};

onMounted(() => {
  handleScroll();
  window.addEventListener("scroll", handleScroll, { passive: true });

  if (import.meta.client) {
    const storedLang = localStorage.getItem("lang");
    if (storedLang && storedLang !== currentLocale.value && storedLang in locales.map((l) => l.code)) {
      currentLocale.value = storedLang;
    } else if (!storedLang) {
      currentLocale.value = locales[0]?.code || "ru";
      localStorage.setItem("lang", currentLocale.value);
    }
  }
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
.site-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  padding-block: 0.9rem;
  transition: background-color 0.25s ease, box-shadow 0.25s ease, padding 0.25s ease;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.05));
}

.site-header--scrolled {
  background: rgba(255, 255, 255, 0.97);
  box-shadow: 0 12px 30px rgba(18, 18, 18, 0.08);
  border-bottom: 1px solid rgba(228, 228, 231, 0.75);
  padding-block: 0.6rem;
  backdrop-filter: blur(12px);
}

.site-header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.site-header__logo {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: clamp(1.3rem, 3vw, 1.75rem);
  letter-spacing: 0.08em;
  color: #fff;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: color 0.2s ease;
}

.site-header--scrolled .site-header__logo {
  color: #000;
}

.site-header__nav {
  display: none;
  align-items: center;
  gap: 1.5rem;
}

.site-header__nav-link {
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.88);
  font-weight: 500;
  font-size: 0.95rem;
  cursor: pointer;
  transition: color 0.2s ease;
}

.site-header--scrolled .site-header__nav-link {
  color: #1f1f1f;
}

.site-header__nav-link:hover {
  color: var(--color-copper);
}

.site-header__actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.site-header__locale {
  display: none;
  align-items: center;
  gap: 0.4rem;
  padding: 0.35rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 8px 20px rgba(15, 15, 15, 0.08);
}

.site-header__locale-btn {
  border: none;
  background: transparent;
  padding: 0.35rem 0.75rem;
  border-radius: 0.5rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-neutral-600);
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.site-header__locale-btn:hover {
  background: rgba(229, 229, 229, 0.6);
}

.site-header__locale-btn--active {
  background: var(--color-copper);
  color: #fff;
}

.site-header__menu {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 0.75rem;
  border: none;
  background: rgba(255, 255, 255, 0.12);
  color: #fff;
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.site-header--scrolled .site-header__menu {
  background: rgba(30, 30, 30, 0.08);
  color: #1f1f1f;
}

.site-header__menu:hover {
  background: rgba(255, 255, 255, 0.24);
}

.site-header--scrolled .site-header__menu:hover {
  background: rgba(30, 30, 30, 0.15);
}

.site-header__overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  z-index: 40;
}

.site-header__mobile {
  position: fixed;
  inset: 60px 0 0;
  transform: translateX(100%);
  transition: transform 0.3s ease;
  background: #fff;
  z-index: 45;
  padding-block: 1.5rem;
}

.site-header__mobile--open {
  transform: translateX(0);
}

.site-header__mobile-link {
  display: block;
  width: 100%;
  text-align: left;
  background: transparent;
  border: none;
  padding: 0.75rem 0;
  font-size: 1.1rem;
  font-weight: 500;
  color: #111;
  cursor: pointer;
  transition: color 0.2s ease;
}

.site-header__mobile-link + .site-header__mobile-link {
  border-top: 1px solid rgba(228, 228, 231, 0.8);
}

.site-header__mobile-link:hover {
  color: var(--color-copper);
}

.site-header__mobile-locale {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.75rem;
  margin-top: 1.25rem;
  padding-top: 1.25rem;
  border-top: 1px solid rgba(228, 228, 231, 0.8);
}

.site-header__mobile-locale-btn {
  border-radius: 0.875rem;
  border: 1px solid rgba(82, 82, 82, 0.15);
  padding: 0.75rem 1rem;
  font-weight: 600;
  background: #f4f4f5;
  color: var(--color-neutral-600);
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
}

.site-header__mobile-locale-btn--active {
  background: var(--color-copper);
  border-color: var(--color-copper);
  color: #fff;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (min-width: 768px) {
  .site-header__nav {
    display: flex;
  }

  .site-header__locale {
    display: inline-flex;
  }

  .site-header__menu {
    display: none;
  }
}
</style>
