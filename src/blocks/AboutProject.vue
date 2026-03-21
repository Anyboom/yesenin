<script setup lang="ts"></script>

<template>
  <section class="about-project">
    <div class="container">
      <div class="about-project__wrapper">
        <h2 class="about-project__title">О проекте</h2>
        <div class="about-project__body">
          <p>
            Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной
            "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую
            коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только
            успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в
            новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее
            время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.
          </p>
          <p>
            Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной
            "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую
            коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только
            успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в
            новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее
            время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
  @use "@/assets/styles/core";
  @use "@/assets/styles/mixins";

  .about-project {
    padding: core.$spacing-8 0;
    background: core.$color-alabaster;

    &__title {
      text-align: center;
      @include mixins.apply-text("heading-2");
      margin-bottom: core.$spacing-6;
    }

    &__body {
      margin: 0 auto;
      max-width: 700px;
      display: flex;
      flex-direction: column;
      gap: core.$spacing-4;
      @include mixins.apply-text("body");
      text-indent: core.$spacing-6;
    }
  }
</style>
