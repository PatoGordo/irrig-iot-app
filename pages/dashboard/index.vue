<script lang="ts" setup>
import * as mqtt from "mqtt/dist/mqtt.min";

import {
  url,
  options,
  SUB_TOPIC_HUMIDITY,
  SUB_TOPIC_DEVICE_FAILURE,
  SUB_TOPIC_DEVICE_ON_OFF,
} from "~/service/mqtt";

const humidity = ref("-- ");
const isOn = ref(false);

const router = useRouter();

onMounted(() => {
  const client = mqtt.connect(url, options);

  client.on("connect", function () {
    client.subscribe(SUB_TOPIC_HUMIDITY);
    client.subscribe(SUB_TOPIC_DEVICE_ON_OFF);
    client.subscribe(SUB_TOPIC_DEVICE_FAILURE);
  });

  client.on("message", function (topic, message) {
    const msg = message.toString();

    if (topic === SUB_TOPIC_HUMIDITY) {
      humidity.value = msg;

      console.log("[HUMIDITY] ->", msg);
    }

    if (topic === SUB_TOPIC_DEVICE_ON_OFF) {
      console.log("[ON/OFF] ->", msg);

      if (msg === "on") {
        isOn.value = true;
      } else {
        isOn.value = false;
      }
    }

    if (topic === SUB_TOPIC_DEVICE_FAILURE) {
      console.log("[FAILURE] ->", msg);
    }
  });
});

definePageMeta({
  middleware: "auth",
  pageTransition: {
    name: "slide-fade",
    mode: "out-in",
  },
});
</script>

<template>
  <div class="w-full h-screen bg-base-300">
    <header class="min-h-[180px] p-4">
      <h1 class="text-2xl logo flex items-center justify-between w-full">
        IRRIG IOT

        <client-only>
          <div>
            <iconify-icon
              v-if="$colorMode.value === 'dark'"
              width="28"
              icon="ph:sun-fill"
              @click="$colorMode.preference = 'light'"
            ></iconify-icon>
            <iconify-icon
              v-if="$colorMode.value === 'light'"
              width="28"
              icon="ph:moon-fill"
              @click="$colorMode.preference = 'dark'"
            ></iconify-icon>
          </div>
        </client-only>
      </h1>

      <div class="flex items-center justify-between mt-4 mb-2 w-full">
        <div
          class="rounded-box bg-base-100 stat w-[110px] h-[110px] p-2 flex flex-col items-center justify-center"
        >
          <div class="stat-title text-sm">ON/OFF</div>
          <div
            class="stat-value text-3xl"
            :class="isOn ? 'text-success' : 'text-error'"
          >
            {{ isOn ? "ON" : "OFF" }}
          </div>
        </div>

        <div
          class="rounded-box bg-base-100 stat w-[110px] h-[110px] p-2 flex flex-col items-center justify-center"
        >
          <div class="stat-title text-sm">Umidade</div>
          <div
            class="stat-value text-3xl"
            :class="
              Number(humidity) >= 70
                ? 'text-info'
                : Number(humidity) >= 30 && Number(humidity) < 70
                ? 'text-warning'
                : 'text-error'
            "
          >
            {{ humidity }}%
          </div>
        </div>

        <div
          class="rounded-box bg-base-100 stat w-[110px] h-[110px] p-2 flex flex-col items-center justify-center"
        >
          <div class="stat-title text-sm">Próximo ciclo</div>
          <div class="stat-value text-3xl">--:--</div>
        </div>
      </div>
    </header>
    <div class="page-content bg-base-100 h-[80%] w-full rounded-t-3xl">
      <h2 class="page-title">Início</h2>

      <div class="w-full bg-base-200 p-4 rounded-box">
        <h3 class="text-lg font-bold mb-4">Configurações do dispositivo</h3>

        <h3 class="font-bold mt-2">Controle por umidade</h3>
        <small><i>Não de intenet para funcionar</i></small>
        <span class="flex items-center justify-between flex-wrap mt-3">
          <span>Ligar se umidade menor que: </span>
          <span class="font-semibold">30%</span>
        </span>
        <span class="flex items-center justify-between flex-wrap">
          <span>Desligar se umidade maior que: </span>
          <span class="font-semibold">90%</span>
        </span>
      </div>

      <nuxt-link class="btn btn-sm btn-info w-full" to="/set-config">
        Alterar Configurações
      </nuxt-link>
    </div>
  </div>
</template>
