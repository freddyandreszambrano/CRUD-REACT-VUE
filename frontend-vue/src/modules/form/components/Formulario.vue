<template>
  <div class="card shadow">
    <div class="card-header bg-primary text-white">
      <h4 class="mb-0">📝 Registro de Formulario</h4>
    </div>
    <div class="card-body">
      <form @submit.prevent="handleSubmit">
        <!-- DNI -->
        <div class="mb-3">
          <label class="form-label fw-bold">DNI/Cédula *</label>
          <input
              class="form-control"
              :class="{ 'is-invalid': errors.dni }"
              placeholder="Ingrese DNI"
              v-model="form.dni"
              :disabled="isSubmitting"
          />
          <div v-if="errors.dni" class="invalid-feedback">
            {{ errors.dni }}
          </div>
        </div>

        <!-- Nombres -->
        <div class="mb-3">
          <label class="form-label fw-bold">Nombres *</label>
          <input
              class="form-control"
              :class="{ 'is-invalid': errors.nombres }"
              placeholder="Ingrese nombres"
              v-model="form.nombres"
              :disabled="isSubmitting"
          />
          <div v-if="errors.nombres" class="invalid-feedback">
            {{ errors.nombres }}
          </div>
        </div>

        <!-- Apellidos -->
        <div class="mb-3">
          <label class="form-label fw-bold">Apellidos *</label>
          <input
              class="form-control"
              :class="{ 'is-invalid': errors.apellidos }"
              placeholder="Ingrese apellidos"
              v-model="form.apellidos"
              :disabled="isSubmitting"
          />
          <div v-if="errors.apellidos" class="invalid-feedback">
            {{ errors.apellidos }}
          </div>
        </div>

        <!-- Fecha de Nacimiento -->
        <div class="mb-3">
          <label class="form-label fw-bold">Fecha de Nacimiento *</label>
          <input
              type="date"
              class="form-control"
              :class="{ 'is-invalid': errors.fechaNacimiento }"
              v-model="form.fechaNacimiento"
              :disabled="isSubmitting"
              :max="today"
          />
          <div v-if="errors.fechaNacimiento" class="invalid-feedback">
            {{ errors.fechaNacimiento }}
          </div>
        </div>

        <!-- Género -->
        <div class="mb-3">
          <label class="form-label fw-bold d-block">Género *</label>
          <div class="form-check form-check-inline">
            <input
                class="form-check-input"
                type="radio"
                id="generoM"
                value="M"
                v-model="form.genero"
                :disabled="isSubmitting"
            />
            <label class="form-check-label" for="generoM">
              Masculino
            </label>
          </div>
          <div class="form-check form-check-inline">
            <input
                class="form-check-input"
                type="radio"
                id="generoF"
                value="F"
                v-model="form.genero"
                :disabled="isSubmitting"
            />
            <label class="form-check-label" for="generoF">
              Femenino
            </label>
          </div>
          <div v-if="errors.genero" class="text-danger small">
            {{ errors.genero }}
          </div>
        </div>

        <!-- Ciudad -->
        <div class="mb-3">
          <label class="form-label fw-bold">Ciudad *</label>
          <select
              class="form-select"
              :class="{ 'is-invalid': errors.ciudad }"
              v-model="form.ciudad"
              :disabled="isSubmitting"
          >
            <option value="">Seleccione Ciudad</option>
            <option value="Quito">Quito</option>
            <option value="Guayaquil">Guayaquil</option>
            <option value="Cuenca">Cuenca</option>
            <option value="Milagro">Milagro</option>
            <option value="Manta">Manta</option>
            <option value="Ambato">Ambato</option>
          </select>
          <div v-if="errors.ciudad" class="invalid-feedback">
            {{ errors.ciudad }}
          </div>
        </div>

        <!-- Error de envío -->
        <div v-if="errors.submit" class="alert alert-danger" role="alert">
          {{ errors.submit }}
        </div>

        <!-- Botón -->
        <button
            type="submit"
            class="btn btn-primary w-100"
            :disabled="isSubmitting"
        >
          <span v-if="isSubmitting">
            <span class="spinner-border spinner-border-sm me-2"></span>
            Guardando...
          </span>
          <span v-else>💾 Guardar Formulario</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import {computed} from "vue";
import {useForm} from "../composables/useForm";
import formService from "../services/formService";

export default {
  name: "Formulario",
  emits: ["formSaved"],
  setup(props, {emit}) {
    const initialFormState = {
      dni: "",
      nombres: "",
      apellidos: "",
      fechaNacimiento: "",
      genero: "",
      ciudad: "",
    };

    const {form, errors, isSubmitting, validate, resetForm, setSubmitting} =
        useForm(initialFormState);

    const today = computed(() => {
      return new Date().toISOString().split("T")[0];
    });

    const handleSubmit = async () => {
      if (!validate()) {
        return;
      }

      setSubmitting(true);

      try {
        await formService.insert(form.value);
        alert("✅ Formulario guardado exitosamente!");
        resetForm();
        emit("formSaved");
      } catch (error) {
        alert(`❌ Error: ${error.message}`);
        errors.value.submit = error.message;
      } finally {
        setSubmitting(false);
      }
    };

    return {
      form,
      errors,
      isSubmitting,
      today,
      handleSubmit,
    };
  },
};
</script>