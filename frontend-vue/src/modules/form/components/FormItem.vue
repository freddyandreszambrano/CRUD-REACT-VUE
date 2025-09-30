<template>
  <li class="list-group-item d-flex justify-content-between align-items-center">
    {{ form.nombres }} {{ form.apellidos }} - {{ form.ciudad }}
    <button class="btn btn-sm btn-danger" @click="$emit('delete', form.id)">Eliminar</button>
  </li>
</template>

<script>
export default {
  props: ["form"],
};
</script>
