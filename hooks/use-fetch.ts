import { useState } from "react";
import { toast } from "sonner";

// Define a generic type T for the data and a type for the callback function
type FetchCallback<T, Args extends unknown[]> = (...args: Args) => Promise<T>;


const useFetch = <T, Args extends unknown[]>(cb: FetchCallback<T, Args>) => {
  const [data, setData] = useState<T | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fn = async (...args: Args) => {
    setLoading(true);
    setError(null);

    try {
      const response = await cb(...args);
      setData(response);
      setError(null);
    } catch (error) {
      const err = error as Error; // Type assertion
      setError(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fn, setData };
};

export default useFetch;
