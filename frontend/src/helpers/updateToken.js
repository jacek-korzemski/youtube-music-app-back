import { api_url } from "Config";

async function updateToken(context) {
  const formData = new FormData();

  formData.append("userId", context.user.userId);
  formData.append("token", context.user.tokenHash);

  const response = await fetch(api_url + "/updateToken", { method: "POST", body: formData });
  return response.json();
}

export default updateToken;
