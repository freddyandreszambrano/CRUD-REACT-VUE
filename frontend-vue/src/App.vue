<template>
  <div class="container mt-5">
    <h1>CRUD Formulario Vue + Node</h1>
    <Formulario />
    <FormList />
  </div>
</template>

<script>
import Formulario from "./modules/form/components/Formulario.vue";
import FormList from "./modules/form/components/FormList.vue";

export default {
  components: { Formulario, FormList },
};
</script>
