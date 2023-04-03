export const url = "wss://broker.emqx.io:8084/mqtt";

export const PUB_TOPIC_SETTINGS = "8f81cd1b9ef1462786129206d7c63ad9/settings";
export const PUB_TOPIC_FORCE_DEVICE_ON_OFF =
  "8f81cd1b9ef1462786129206d7c63ad9/force-on-off";

export const SUB_TOPIC_HUMIDITY = "8f81cd1b9ef1462786129206d7c63ad9/humidity";
export const SUB_TOPIC_DEVICE_ON_OFF =
  "8f81cd1b9ef1462786129206d7c63ad9/on-off";
export const SUB_TOPIC_DEVICE_FAILURE =
  "8f81cd1b9ef1462786129206d7c63ad9/device-failure";

export const options = {
  clean: false,
  connectTimeout: 1500,
  clientId: `emqx_vue_${generateID(16)}`,
  username: "",
  password: "",
};
