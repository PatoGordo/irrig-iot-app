<script lang="ts" setup>
import { api } from "~~/service/api";
import { useLoading } from "~~/store/loading";
import { options, PUB_TOPIC_SETTINGS, url } from "~~/service/mqtt";
import * as mqtt from "mqtt/dist/mqtt.min";

const turn_on = ref("");
const turn_off = ref("");

const loading = useLoading();
const router = useRouter();

const handleChangeSettings = async () => {
  const client = mqtt.connect(url, options);

  loading.open();

  loading.hint = "Alterando configurações...";

  client.on("connect", async function () {
    try {
      await api.post("/config/record", {
        turn_on: Number(turn_on.value),
        turn_off: Number(turn_off.value),
      });

      client.publish(
        PUB_TOPIC_SETTINGS,
        JSON.stringify({
          turn_on: Number(turn_on.value),
          turn_off: Number(turn_off.value),
        }).replaceAll(" ", "")
      );

      loading.close();

      client.end();

      router.push("/dashboard");
    } catch (error) {
      console.log(error);
      loading.close();
    }
  });
};

definePageMeta({
  middleware: "auth",
  pageTransition: {
    name: "slide-fade",
    mode: "out-in",
  },
});
</script>

<template>
  <div class="page-content">
    <h2 class="page-title">Nova configuração</h2>

    <form
      class="gap-4 flex flex-col items-start justify-start w-full"
      @submit.prevent="handleChangeSettings"
    >
      <input
        v-model="turn_on"
        type="text"
        placeholder="Liga quando umidade menor que"
        class="input input-bordered w-full"
        required
      />

      <input
        v-model="turn_off"
        type="text"
        placeholder="Desliga quando umidade maior que"
        class="input input-bordered w-full"
        required
      />

      <button class="btn btn-sm btn-info self-end" type="submit">
        Salvar configuração
      </button>
    </form>
  </div>
</template>
