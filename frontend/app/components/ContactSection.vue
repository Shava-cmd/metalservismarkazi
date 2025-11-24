<template>
  <section id="contact" class="contact">
    <div class="container-section">
      <h2 class="section-title contact__title">Свяжитесь с нами</h2>

      <div class="contact__grid">
        <form class="contact__form" @submit.prevent="handleSubmit">
          <div class="contact__fields">
            <label class="contact__field">
              <span>Имя</span>
              <input v-model="form.name" type="text" name="name" required placeholder="Иван Иванов" />
            </label>
            <label class="contact__field">
              <span>Компания</span>
              <input v-model="form.company" type="text" name="company" placeholder="ООО «Компания»" />
            </label>
            <label class="contact__field contact__field--full">
              <span>Телефон</span>
              <input v-model="form.phone" type="tel" name="phone" required placeholder="+998 (__) ___-__-__" />
            </label>
            <label class="contact__field contact__field--full">
              <span>Сообщение</span>
              <textarea v-model="form.message" name="message" rows="4" required placeholder="Расскажите о задаче" />
            </label>
          </div>

          <div class="contact__actions">
            <button class="btn-primary" type="submit" :disabled="state === 'sending'">
              {{ state === "sending" ? "Отправка…" : "Отправить заявку" }}
            </button>
            <span v-if="state === 'success'" class="contact__status contact__status--success">Заявка отправлена</span>
            <span v-else-if="state === 'error'" class="contact__status contact__status--error"
              >Ошибка, попробуйте позже</span
            >
          </div>
        </form>

        <aside class="contact__info">
          <h3>Контакты</h3>
          <ul>
            <li><strong>Адрес:</strong> г. Ширин, ул. Бунёдкор 84</li>
            <li><strong>Телефон:</strong> +998 (71) 514-14-62</li>
            <li><strong>Email:</strong> info@msm.uz</li>
          </ul>
          <div class="contact__map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m24!1m12!1m3!1d24371.855985511334!2d69.24057048279913!3d40.22058420866007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m9!3e3!4m3!3m2!1d40.220582199999996!2d69.2745932!4m3!3m2!1d40.231078499999995!2d69.2764514!5e0!3m2!1sru!2s!4v1764009477811!5m2!1sru!2s"
              width="600"
              height="450"
              style="border: 0"              
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </aside>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";

interface ContactForm {
  name: string;
  company: string;
  phone: string;
  message: string;
}

type FormState = "idle" | "sending" | "success" | "error";

const form = reactive<ContactForm>({
  name: "",
  company: "",
  phone: "",
  message: "",
});

const state = ref<FormState>("idle");

const handleSubmit = async () => {
  state.value = "sending";

  try {
    await new Promise((resolve) => setTimeout(resolve, 1200));
    state.value = "success";
    form.name = "";
    form.company = "";
    form.phone = "";
    form.message = "";
  } catch (error) {
    console.error("Contact form submission error", error);
    state.value = "error";
  }
};
</script>

<style scoped>
.contact {
  padding-block: clamp(4.5rem, 10vw, 6rem);
  background: #fff;
}

.contact__title {
  text-align: center;
}

.contact__grid {
  margin-top: clamp(2.5rem, 7vw, 3.2rem);
  display: grid;
  gap: 2rem;
}

.contact__form,
.contact__info {
  border-radius: 1.5rem;
  border: 1px solid var(--color-neutral-200);
  background: #fff;
  box-shadow: 0 18px 48px rgba(18, 18, 18, 0.08);
  padding: clamp(1.5rem, 4vw, 2.25rem);
}

.contact__fields {
  display: grid;
  gap: 1.25rem;
}

.contact__field {
  display: grid;
  gap: 0.6rem;
}

.contact__field span {
  font-size: 0.95rem;
  font-weight: 600;
  color: #1f1f1f;
}

.contact__field input,
.contact__field textarea {
  width: 100%;
  border-radius: 0.9rem;
  border: 1px solid rgba(212, 212, 216, 0.8);
  padding: 0.9rem 1rem;
  font-size: 1rem;
  font-family: inherit;
  color: #111;
  background: #fff;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  resize: vertical;
}

.contact__field input:focus,
.contact__field textarea:focus {
  outline: none;
  border-color: rgba(199, 97, 39, 0.85);
  box-shadow: 0 0 0 4px rgba(199, 97, 39, 0.12);
}

.contact__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
  margin-top: 1.5rem;
}

.contact__status {
  font-size: 0.95rem;
  font-weight: 600;
}

.contact__status--success {
  color: #4ade80;
}

.contact__status--error {
  color: #f87171;
}

.contact__info h3 {
  margin: 0 0 1.5rem;
  font-size: 1.2rem;
  font-weight: 600;
}

.contact__info ul {
  margin: 0 0 1.5rem;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 0.7rem;
  color: #1f1f1f;
}

.contact__info strong {
  font-weight: 600;
}

.contact__map {
  border-radius: 1rem;
  overflow: hidden;
  border: 1px solid rgba(212, 212, 216, 0.8);
  aspect-ratio: 16 / 9;
}

.contact__map iframe {
  border: none;
  width: 100%;
  height: 100%;
}

@media (min-width: 768px) {
  .contact__grid {
    grid-template-columns: minmax(0, 1.3fr) minmax(0, 1fr);
  }

  .contact__field.contact__field--full {
    grid-column: span 2;
  }

  .contact__fields {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
