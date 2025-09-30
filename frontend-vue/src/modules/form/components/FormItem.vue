<template>
  <li class="list-group-item">
    <div class="d-flex justify-content-between align-items-start">
      <div class="flex-grow-1">
        <h5 class="mb-1">{{ form.nombres }} {{ form.apellidos }}</h5>
        <p class="mb-1">
          <span class="badge bg-secondary me-2">DNI: {{ form.dni }}</span>
          <span class="badge bg-info me-2">
            {{ form.genero === "M" ? "👨 Masculino" : "👩 Femenino" }}
          </span>
          <span class="badge bg-primary">📍 {{ form.ciudad }}</span>
        </p>
        <small class="text-muted">
          📅 Fecha de Nacimiento: {{ formatDate(form.fechaNacimiento) }}
        </small>
        <small v-if="form.createdAt" class="text-muted d-block">
          🕒 Creado: {{ formatDateTime(form.createdAt) }}
        </small>
      </div>
      <button
          class="btn btn-sm btn-danger"
          @click="$emit('delete', form.id)"
      >
        🗑️ Eliminar
      </button>
    </div>
  </li>
</template>

<script>
export default {
  name: "FormItem",
  props: {
    form: {
      type: Object,
      required: true,
    },
  },
  emits: ["delete"],
  setup() {
    const formatDate = (dateString) => {
      if (!dateString) return "";
      return new Date(dateString).toLocaleDateString("es-ES");
    };

    const formatDateTime = (dateString) => {
      if (!dateString) return "";
      return new Date(dateString).toLocaleString("es-ES");
    };

    return {
      formatDate,
      formatDateTime,
    };
  },
};
</script>
