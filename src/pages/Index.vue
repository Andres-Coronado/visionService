<template>
  <div class="q-pa-md" style="max-width: 400px">
    <q-form @submit.prevent="onSubmit" class="q-gutter-md">
      <q-input
        filled
        v-model="img"
        label="Your img *"
        hint="https://www.gob.mx/cms/uploads/article/main_image/3105/Frutas-Verduras.jpg"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Pon una imagen (URL)']"
      />

      <div>
        <q-btn label="Submit" type="submit" color="primary" />
      </div>
      <!-- <q-img
        :src="img"
        spinner-color="white"
        style="height: auto; max-width: auto"
      /> -->
    </q-form>

    <div v-if="img && imgData">
      <q-img
        :src="img"
        spinner-color="white"
        style="height: auto; max-width: auto"
      />
      <p><strong>text</strong> {{ imgData.text }}</p>
      <p><strong>confidence</strong> {{ imgData.confidence }}</p>
    </div>
    <div v-else>No hay dato</div>
  </div>
</template>

<script>
import { useQuasar,QSpinnerFacebook} from 'quasar';
import { ref } from 'vue';
import getData from '../helpers/VisionServiceDesc';
export default {
  setup() {
    const $q = useQuasar();

    const img = ref(null);
    const imgData = ref(null);
    return {
      async onSubmit() {
        console.log(img.value);
        $q.loading.show({
          spinner: QSpinnerFacebook,
          spinnerColor: 'blue',
          spinnerSize: 140,
          backgroundColor: 'white',
          message: 'Some important process is in progress. Hang on...',
          messageColor: 'black'
        })
        imgData.value = await getData(img.value);
                  $q.loading.hide()

        console.log(imgData.value);
      },
      img,
      imgData,
    };
  },
};
</script>
