import { useEffect, useState } from 'react';

const ALL_BREEDS = 'https://dog.ceo/api/breeds/list/all';

export const useBreeds = () => {
  const [breeds, setBreeds] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(ALL_BREEDS)
      .then((response: any) => response.json())
      .then(({ message }: any) => {
        setIsLoading(false);
        setBreeds(message);
      });
  }, []);

  return {
    breeds,
    isLoading,
  }
};
