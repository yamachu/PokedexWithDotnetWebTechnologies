<script setup lang="ts">
import { useCapturePokemon } from "@pokedex-dotnet-vue/interop-mauiblazor/src/useCapturePokemon";
import { useFetchPokemon } from "@pokedex-dotnet-vue/interop-mauiblazor/src/useFetchPokemon";
import { getCurrentInstance, ref, watch } from "vue";

type Pokemons = Awaited<
  ReturnType<ReturnType<typeof useFetchPokemon>["fetchPokemons"]["value"]>
>;

const { fetchPokemons, fragment: fetchPokemonRender } = useFetchPokemon({
  instance: getCurrentInstance()!,
  DataSourceGetter: () => "Data Source=./Contents/Resources/pokemons.db",
});
const {
  migration,
  deleteCapturedPokemon,
  fetchCapturedPokemons,
  putCapturedPokemon,
  fragment: fetchCapturedPokemonRender,
} = useCapturePokemon({
  instance: getCurrentInstance()!,
  DataSourceGetter: () => "this value not used in .NET MAUI Blazor",
});

const pokemons = ref<Pokemons>([]);
const capturedPokemonIds = ref<number[]>([]);

watch(fetchPokemons, () => {
  fetchPokemons.value().then((v) => {
    pokemons.value = v;
  });
});
watch(migration, () => {
  migration.value();
})
watch(fetchCapturedPokemons, () =>
  fetchCapturedPokemons.value().then((v) => {
    capturedPokemonIds.value = v;
  })
);

const putCaptured = async (id: number) => {
  await putCapturedPokemon.value(id);
  capturedPokemonIds.value = await fetchCapturedPokemons.value();
};

const deleteCaptured = async (id: number) => {
  await deleteCapturedPokemon.value(id);
  capturedPokemonIds.value = await fetchCapturedPokemons.value();
};
</script>

<template>
  <h1>Vite + Vue + .NET MAUI Blazor</h1>
  <h2>From .NET!</h2>
  <ul>
    <li
      v-for="pokemon in pokemons"
      :key="pokemon.id"
      style="list-style: none"
      @click="
        () =>
          capturedPokemonIds.some((c) => c === pokemon.id)
            ? deleteCaptured(pokemon.id)
            : putCaptured(pokemon.id)
      "
    >
      <span
        :style="{
          paddingRight: '8px',
          color: capturedPokemonIds.some((c) => c === pokemon.id)
            ? 'red'
            : 'gray',
        }"
      >
        ●
      </span>
      {{ ("000" + pokemon.id).slice(-3) }}: {{ pokemon.name }}
    </li>
  </ul>
  <div>
    <fetchPokemonRender />
  </div>
  <div>
    <fetchCapturedPokemonRender />
  </div>
</template>
