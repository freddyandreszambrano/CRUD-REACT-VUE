<template>
  <form @submit.prevent="handleSubmit" class="mb-4 p-3 border rounded">
    <div class="mb-3">
      <input class="form-control" placeholder="DNI" v-model="form.dni"/>
    </div>
    <div class="mb-3">
      <input class="form-control" placeholder="Nombres" v-model="form.nombres"/>
    </div>
    <div class="mb-3">
      <input class="form-control" placeholder="Apellidos" v-model="form.apellidos"/>
    </div>
    <div class="mb-3">
      <input type="date" class="form-control" v-model="form.fechaNacimiento"/>
    </div>

    <div class="mb-3">
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" value="M" v-model="form.genero"/>
        <label class="form-check-label">Masculino</label>
      </div>
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" value="F" v-model="form.genero"/>
        <label class="form-check-label">Femenino</label>
      </div>
    </div>

    <div class="mb-3">
      <select class="form-select" v-model="form.ciudad">
        <option value="">Seleccione Ciudad</option>
        <option value="Quito">Quito</option>
        <option value="Guayaquil">Guayaquil</option>
        <option value="Cuenca">Cuenca</option>
      </select>
    </div>

    <button class="btn btn-primary" type="submit">Guardar</button>
  </form>
</template>

<script>
import {reactive} from "vue";
import formService from "../services/formService";

export default {
  setup() {
    const form = reactive({
      dni: "",
      nombres: "",
      apellidos: "",
      fechaNacimiento: "",
      genero: "",
      ciudad: "",
    });

    const handleSubmit = async () => {
      await formService.insert(form);
      Object.keys(form).forEach(key => form[key] = ""); // Limpiar
    };

    return {form, handleSubmit};
  },
};
</script>
