<template>
  <div class="container py-5">
    <div class="text-center mb-5">
      <h1 class="display-4 text-primary fw-bold">
        Sistema de Gestión de Formularios
      </h1>
      <p class="lead text-muted">CRUD Completo con Node.js y Vue 3</p>
    </div>

    <div class="row g-4">
      <div class="col-lg-5">
        <Formulario @formSaved="handleFormSaved"/>
      </div>
      <div class="col-lg-7">
        <FormList :refreshTrigger="refreshKey"/>
      </div>
    </div>
  </div>
</template>

<script>
import {ref} from "vue";
import Formulario from "./modules/form/components/Formulario.vue";
import FormList from "./modules/form/components/FormList.vue";

export default {
  name: "App",
  components: {
    Formulario,
    FormList,
  },
  setup() {
    const refreshKey = ref(0);

    const handleFormSaved = () => {
      refreshKey.value++;
    };

    return {
      refreshKey,
      handleFormSaved,
    };
  },
};
</script>
