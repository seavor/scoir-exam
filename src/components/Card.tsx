import { useEffect, useState } from 'react';
import styled from 'styled-components';

interface CardProps {
  breed: string;
  onRemove: (breed: string) => void;
}

const StyledCard = styled('div')`
  position: relative;
  width: 100%;
  padding: 8px;
  border: 1px solid black;

  button {
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(50%, -50%);

    color: red;
    background: white;
    border: 1px solid;
    border-radius: 10em;
    width: 1.5em;
    height: 1.5em;
  }

  .image {
    width: 100%;
    padding-bottom: 118%;
    margin-bottom: 8px;
  }

  .breed {
    text-align: center;
    padding: 8px 0;
  }
`;

const getUrl = (breed: string) => `https://dog.ceo/api/breed/${breed}/images/random`

export const Card = ({ breed, onRemove }: CardProps) => {
  const [url, setUrl] = useState('');

  useEffect(() => {
    fetch(getUrl(breed))
      .then((response: any) => response.json())
      .then(({ message }: any) => {
        setUrl(message);
      });
  }, [breed, setUrl]);

  return (
    <StyledCard>
      <button onClick={() => onRemove(breed)}>X</button>
      <div className="image" style={{ background: `url(${url})` }} />
      <div className="breed">
        {breed}
      </div>
    </StyledCard>
  );
};
