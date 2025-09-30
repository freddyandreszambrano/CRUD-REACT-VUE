<template>
  <div>
    <h3>Lista de Registros</h3>
    <ul class="list-group">
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
import {onMounted, ref} from "vue";
import FormItem from "./FormItem.vue";
import formService from "../services/formService";

export default {
  components: {FormItem},
  setup() {
    const forms = ref([]);

    const loadForms = async () => {
      forms.value = await formService.getAll();
    };

    const deleteForm = async (id) => {
      await formService.remove(id);
      loadForms();
    };

    onMounted(loadForms);

    return {forms, deleteForm};
  },
};
</script>
