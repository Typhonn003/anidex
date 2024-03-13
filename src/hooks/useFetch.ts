import api from "@/services/axiosClient";
import useSWR from "swr";

const useFetch = <Data = any>(url: string | null) => {
  const fetcher = (url: string) => api.get(url).then((res) => res.data);

  const { data, error, isLoading } = useSWR<Data>(url, fetcher);

  return { data, error, isLoading };
};

export default useFetch;
