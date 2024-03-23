<script setup lang="ts">
import { useData } from "vitepress";

const { site } = useData();

const { post } = defineProps<{
  post: {
    title: string;
    description: string;
    link: string;
    date: string;
  };
}>();

const link = (site.value.base + post.link).replace("//", "/");
</script>

<template>
  <a :href="link" class="card">
    <h2>{{ post.title }}</h2>
    <small class="date">{{ post.date }}</small>
    <p>{{ post.description }}</p>
    <span class="read-more">Read more 🡒</span>
  </a>
</template>

<style scoped>
a {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr auto 1fr;
}

a.card {
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  text-decoration: none;
  color: inherit;
  transition: all 0.2s ease-in-out;
  max-width: 800px;
  margin-bottom: 1rem;
}

h2 {
  grid-column: 1 / 2;
  grid-row: 1 / 2;
  font-weight: 600;
}

small.date {
  grid-column: 2 / 3;
  grid-row: 1 / 2;
  text-align: right;
}

p {
  grid-column: 1 / 3;
  grid-row: 2 / 3;
  padding-block: 10px;
  text-align: justify;
}

span.read-more {
  grid-column: 2 / 3;
  grid-row: 3 / 4;
  text-align: right;
}

.read-more {
  position: relative;
  left: 0;
  transition: all 0.2s;
}

a.card:hover {
  .read-more {
    left: 5px;
  }
}
</style>

