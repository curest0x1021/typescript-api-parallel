import chunks from "lodash/chunk";
import { ApiUtils } from "./apiUtils";

export const useApi = () => {
  const { runAPI } = ApiUtils();
  async function runInParallel(urls: string[], concurrency: number): Promise<any[]> {
    const dataPromise = await Promise.allSettled(
      chunks(urls, concurrency).map((items) => runAll(items))
    );
    const result = dataPromise
      .filter(({ status }) => status === "fulfilled")
      .map((p) => (p as PromiseFulfilledResult<any[]>).value)
      .flatMap((p) => p);
    return result;
  }

  async function runAll(urls: string[]): Promise<any[]> {
    const promiseAll = await Promise.all(
      urls.map((url) =>
        runAPI({
          method: "get",
          url: url,
        })
      )
    );
    return promiseAll;
  }

  return { runInParallel };
};
