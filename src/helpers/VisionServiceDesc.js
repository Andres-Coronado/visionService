/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import axios from 'axios';
import { ref } from 'vue';

export default async function getData(Initialimg) {
  const img = ref(Initialimg);
  var data = JSON.stringify({
    url: img.value,
  });

  var config = {
    method: 'post',
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    url: `${process.env.ENDPOINT}/computervision/imageanalysis:analyze?api-version=2022-10-12-preview&features=description&language=en`,
    headers: {
      'Ocp-Apim-Subscription-Key': process.env.API_KEY,
      'Content-Type': 'application/json',
    },
    data: data,
  };

  const repuesta =  await axios(config)
    .then(function (response) {
      console.log(response);
      // return JSON.stringify(response.data.descriptionResult.values[0].text);
      response = response.data.descriptionResult.values[0]
      return response

    })

    .catch(function (error) {
      console.log(error);
    });

    return repuesta
}
