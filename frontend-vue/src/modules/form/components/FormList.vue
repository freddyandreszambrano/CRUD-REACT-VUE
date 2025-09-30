<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h3>📋 Lista de Registros ({{ forms.length }})</h3>
      <button class="btn btn-sm btn-outline-primary" @click="loadForms">
        🔄 Recargar
      </button>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Cargando...</span>
      </div>
      <p class="mt-3 text-muted">Cargando registros...</p>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="alert alert-danger" role="alert">
      <strong>Error:</strong> {{ error }}
      <button class="btn btn-sm btn-outline-danger ms-3" @click="loadForms">
        Reintentar
      </button>
    </div>

    <!-- Sin datos -->
    <div v-else-if="forms.length === 0" class="alert alert-info">
      <strong>ℹ️ Sin registros</strong>
      <p class="mb-0">
        Aún no hay formularios guardados. Completa el formulario para agregar el
        primero.
      </p>
    </div>

    <!-- Lista -->
    <ul v-else class="list-group">
      <FormItem
          v-for="item in forms"
          :key="item.id"
          :form="item"
          @delete="deleteForm"
      />
    </ul>
  </div>
</template>

<script>
import {onMounted, ref, watch} from "vue";
import FormItem from "./FormItem.vue";
import formService from "../services/formService";

export default {
  name: "FormList",
  components: {FormItem},
  props: {
    refreshTrigger: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    const forms = ref([]);
    const loading = ref(true);
    const error = ref(null);

    const loadForms = async () => {
      try {
        loading.value = true;
        error.value = null;
        forms.value = await formService.getAll();
      } catch (err) {
        error.value = err.message;
        console.error("Error cargando formularios:", err);
      } finally {
        loading.value = false;
      }
    };

    const deleteForm = async (id) => {
      if (!window.confirm("¿Está seguro de eliminar este registro?")) {
        return;
      }

      try {
        await formService.remove(id);
        alert("✅ Registro eliminado correctamente");
        loadForms();
      } catch (err) {
        alert(`❌ Error al eliminar: ${err.message}`);
      }
    };

    watch(
        () => props.refreshTrigger,
        () => {
          loadForms();
        }
    );

    onMounted(loadForms);

    return {
      forms,
      loading,
      error,
      loadForms,
      deleteForm,
    };
  },
};
</script>