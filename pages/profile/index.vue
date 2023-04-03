<script lang="ts" setup>
import Swal from "sweetalert2";
import { api } from "~~/service/api";
import { useAuthStore } from "~~/store/auth";
import { useLoading } from "~~/store/loading";

const auth = useAuthStore();

const loading = useLoading();

const handleLogout = async () => {
  auth.signOut();
};

const handleGetSSOToken = async () => {
  const confirmPasswordResult = await Swal.fire({
    title: "Confirme sua senha",
    html: `
        <p>Antes de realizar essa açao você deve cofirmar sua senha, por motivos de segurança.</p>
        <input type="password" id="confirm-password" class="swal2-input" placeholder="Password" min="8" max="64" />
      `,
    confirmButtonText: "Confirmar",
    focusConfirm: false,
    preConfirm: () => {
      const password = String(
        Swal.getPopup()?.querySelector<HTMLInputElement>("#confirm-password")
          ?.value
      );
      if (!password) {
        Swal.showValidationMessage(`Por favor digite sua senha`);
      }

      return { password };
    },
  });

  const password = confirmPasswordResult.value?.password;

  try {
    loading.open();

    loading.hint = "Gerando token...";

    const res = await api.post("/auth/single-sign-on", {
      email: auth.user?.email,
      password,
    });

    Swal.fire(
      "Copie o token de acesso SSO abaixo",
      res.data.result.key,
      "success"
    );

    loading.close();
  } catch (error) {
    console.error(error);
    loading.close();
  }
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
    <h2>Perfil</h2>

    <button class="btn btn-info btn-sm w-full" @click="handleGetSSOToken">
      Gerar token SSO
    </button>

    <button class="btn btn-error btn-sm w-full" @click="handleLogout">
      Encerrar Sessão
    </button>
  </div>
</template>
