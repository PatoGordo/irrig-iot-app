<script lang="ts" setup>
import { api } from "~~/service/api";
import { useLoading } from "~~/store/loading";
import { Record } from "types/record";
import { recordTitleEnum } from "~~/utils/enums";
import moment from "moment";

const records = ref<Record[]>([]);

const loading = useLoading();

const handleGetData = async () => {
  try {
    loading.open();

    loading.hint = "Carregando histórico...";
    const res = await api.get("/record/find-many");

    const data = res.data.result;

    records.value = data.slice(0, 20);
    loading.close();
  } catch (error) {
    loading.close();
    console.error(error);
  }
};

onMounted(async () => {
  await handleGetData();
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
  <div class="page-content">
    <h2>Histórico</h2>

    <section class="flex flex-col items-start justify-start w-full h-fit gap-4">
      <div
        v-for="record of records"
        :key="record.id"
        class="card w-full bg-base-200 shadow-xl rounded-box"
      >
        <div class="card-body p-4">
          <h2 class="card-title">{{ recordTitleEnum[record.name] }}</h2>
          <p v-if="typeof record.amount === 'number'">
            Valor medido: <strong>{{ record.amount }}%</strong>
          </p>
          <p>
            Horário: {{ moment(record.createdAt).format("DD/MM/YYYY HH:mm") }}
          </p>
        </div>
      </div>
    </section>
  </div>
</template>
