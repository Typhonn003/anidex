import api from "@/services/axiosClient";
import useSWRImmutable from "swr/immutable";

const useFetch = <Data = any>(url: string | null) => {
  const fetcher = (url: string) => api.get(url).then((res) => res.data);

  const { data, error, isLoading } = useSWRImmutable<Data>(url, fetcher);

  return { data, error, isLoading };
};

export default useFetch;
