<script setup lang="ts">
  import AppButton from "@/components/AppButton.vue";
  import { Icon } from "@iconify/vue";
  import { ref } from "vue";

  const isShow = ref(false);
</script>

<template>
  <div class="app-sources">
    <div class="container">
      <div class="app-sources__wrapper">
        <h2 class="app-sources__title">
          Источники
          <AppButton
            class="app-sources__button"
            v-if="!isShow"
            @click="isShow = true"
          >
            <Icon
              class="app-sources__icon"
              icon="fa7-solid:chevron-down"
              width="24"
              height="24"
            ></Icon>
          </AppButton>
        </h2>

        <div
          class="app-sources__body"
          v-if="isShow"
        >
          <p>
            Аксёнова Г. В. Дивный художник Клавдий Лебедев: размышления над текстами Священного Писания // Императорское
            Православное Палестинское Общество : официальный сайт. — [Б. м.], 2014. — URL:
            https://www.ippo.ru/news/article/divnyy-hudozhnik-klavdiy-lebedev-razmyshleniya-nad-202559 (дата обращения:
            05.02.2022).
          </p>
          <p>
            Антология русского лубка : от «потешных» картинок до познавательных иллюстраций // Культурология. РФ :
            [сайт]. — [Б. м.], 2016. — URL: https://kulturologia.ru/blogs/270216/28595/ (дата обращения: 02.02.2022).
          </p>
          <p>
            Великий печатник России // Библиотечное дело : журнал. — СПб., [б. г.]. — URL:
            http://www.bibliograf.ru/materials/news/1897/ (дата обращения: 02.02.2022).
          </p>
          <p>Динерштейн Е. А. Деятели книги. И. Д. Сытин. — М. : Книга, 1983. — 271 с.</p>
          <p>
            Ковынева М. Искусство лубка в дореволюционной России // Культура. РФ : [сайт]. — [Б. м.], 2020. — URL:
            https://www.culture.ru/materials/254483/iskusstvo-lubka-v-dorevolyucionnoi-rossii (дата обращения:
            03.02.2022).
          </p>
          <p>
            Кошельник Д. «Издательский король»: как влиял на общество просветитель Иван Сытин // VC.RU : [сайт]. — [Б.
            м.], 2016. — URL: https://vc.ru/story/14729-sytin (дата обращения: 02.02.2022).
          </p>
          <p>
            Кравецкий А. Великий русский издатель // Деньги : журнал. — [Б. м.], 2016. — URL:
            https://www.kommersant.ru/doc/3023082 (дата обращения: 03.02.2022).
          </p>
          <p>
            Лозинская Р. Лубок. Картинки для народа // Артхив : [сайт]. — [Б. м.], 2022. — URL:
            https://artchive.ru/encyclopedia/4406~Lubok (дата обращения: 03.02.2022).
          </p>
          <p>
            Лубок. Специальный проект Большого музея // Большой музей : официальный сайт. — М., 2019. — URL:
            https://lubok.bm.digital/text (дата обращения: 04.02.2022).
          </p>
          <p>
            Лубочные картинки // История книги на Руси : [сайт]. — [Б. м.], 2020.— URL:
            https://maxbooks.ru/bakhtiarov/lubok.htm (дата обращения: 03.02.2022).
          </p>
          <p>
            Пером и кистью. Лубочные традиции // Культура. РФ : [сайт]. — [Б. м.], 2015. — URL:
            https://www.culture.ru/news/36318/perom-i-kistyu-lubochnye-tradicii (дата обращения: 03.02.2022).
          </p>
          <p>
            Русские лубочные картинки. Литография Товарищества И. Д. Сытина // Liveinternet : [сайт]. — [Б. м.], 2018. —
            URL: https://www.liveinternet.ru/users/bo4kameda/post441098348/ (дата обращения: 02.02.2022).
          </p>
          <p>
            Рууд Ч. Русский предприниматель московский издатель Иван Сытин. — М. : ТЕРРА, 1996. — Гл. 2 : Больше изданий
            для народа. — 282 с.
          </p>
          <p>
            Сустретова О. Иван Дмитриевич Сытин. «Наполеон книжного дела» // ВО!круг книг. Блог Центральной библиотеки
            им. А. С. Пушкина г. Челябинска : [сайт]. – Челябинск, 2021. – URL:
            http://vokrugknig.blogspot.com/2021/02/blog-post_29.html (дата обращения: 03.02.2022).
          </p>
          <p>
            СЫТИН // Большая российская энциклопедия : электронная энциклопедия. — [Б. м.], 2019. — URL:
            https://bigenc.ru/domestic_history/text/4176943 (дата обращения: 02.02.2022).
          </p>
          <p>Сытин И. Д. Жизнь для книги. — М. : Политиздат, 1962. — 285 с.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  @use "@/assets/styles/core";
  @use "@/assets/styles/mixins";

  .app-sources {
    padding: core.$spacing-8 0;
    background: core.$color-alabaster;

    &__title {
      @include mixins.apply-text("heading-2");
      display: flex;
      gap: core.$spacing-1;
      width: fit-content;
      align-items: center;
      margin: 0 auto core.$spacing-6;
    }

    &__button {
      display: flex;
      place-items: center;
    }

    &__body {
      display: flex;
      flex-direction: column;
      gap: core.$spacing-2;
      @include mixins.apply-text("body");
    }
  }
</style>
