import axios, { Method } from "axios";

export const ApiUtils = () => {
  const axiosInstance = axios.create({
    timeout: 60000,
    headers: { "Content-Type": "application/json" },
  });

  async function runAPI(props: { method: Method; url: string; data?: string }): Promise<any> {
    try {
      const res = await axiosInstance.request({
        method: props.method,
        url: props.url,
        data: props.data,
      });
      if (res.status === 200) {
        return res.data;
      }
    } catch (err) {
      console.log(err);
    }
    return {};
  }

  return { runAPI };
};
