import { useState, ChangeEvent } from 'react';
import styled from 'styled-components';

import { Card } from './components';
import { useBreeds } from './hooks';

const StyledApp = styled('div')`
  height: 100%;
  display: flex;
  flex-direction: column;

  header {
    text-align: center;

    h1 {
      margin: 16px 0;
    }

    .search {
      position: relative;
      display: inline-block;
    }

    input {
      position: relative;
      z-index: 2;
      width: 200px;
    }

    .autocomplete {
      border: 1px solid grey;
      position: absolute;
      width: 100%;
      max-height: 40vh;
      background: white;
      border-radius: 5px;
      border-top-left-radius: 0;
      border-top-right-radius: 0;
      transform: translateY(-1px);
      z-index: 1;
      display: none;

      button {
        width: 100%;
        padding: 8px;
        text-align: left;
        border-bottom: 1px solid lightgrey;

        &:last-of-type {
          border: 0;
        }
      }
    }

    .autocomplete:hover,
    input:focus + .autocomplete {
      display: block;
    }

    .random {
      margin: 16px auto 32px;
      border: 1px solid grey;
      padding: 16px;
      border-radius: 5px;
      display: block;
    }
  }

  .caught {
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    padding: 0 32px;

    &-header {
      position: relative;
      text-align: center;
      margin: 16px 0;

      button {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        border: 1px solid;
        border-radius: 5px;
        padding: 8px 16px 8px 36px;
        color: red;

        &::before {
          content: 'x';
          position: absolute;
          left: 8px;
          top: 50%;
          transform: translateY(-50%);
          border: 1px solid;
          border-radius: 10em;
          padding: 2px;
          width: 1em;
          line-height: 1;
        }

        @media (max-width: 768px) {
          position: relative;
          display: block;
          margin: 8px auto 0;
        }
      }
    }

    &-breeds {
      height: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 16px;
      padding: 16px;

      & > * {
        width: 275px;
        margin-bottom: 8px;
      }
    }
  }
`

function App() {
  const [input, setInput] = useState('');
  const [caught, setCaught] = useState<any>({});

  const { breeds, isLoading } = useBreeds();

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value);

  const addBreed = (breed: string) => setCaught((s: any) => ({ ...s, [breed]: true }));
  const removeBreed = (breed: string) => setCaught((s: any) => ({ ...s, [breed]: false }));

  const addRandom = () => {
    const uncaught = Object.keys(breeds).filter((breed: string) => !caught[breed]);
    const random = Math.round(Math.random() * (uncaught.length - 1) + 1);
    
    addBreed(uncaught[random]);
  }

  return (
    <StyledApp>
      <header>
        <h1>Dog Catcher</h1>

        <div className="search">
          <input
            placeholder="Add a breed to your Caught list"
            value={input}
            onChange={onInputChange} />

          <div className="autocomplete overflow-scroll">
            {
              Object.keys(breeds)
                .filter((breed: string) => {
                  return breed.includes(input) && !caught[breed]
                })
                .map((breed: string, index: number) => (
                  <button key={index} onClick={() => addBreed(breed)}>
                    {breed}
                  </button>
                ))
            }
          </div>
        </div>

        <button className="random" onClick={addRandom}>
          + Catch A Random Breed
        </button>
      </header>

      <div className="caught">
        <div className="caught-header">
          <span>Caught Breeds</span>
          <button onClick={() => setCaught({})}>Clear All</button>
        </div>

        <div className="caught-breeds overflow-scroll">
          {
            isLoading 
              ? <div className="loading">Loading</div>
              : (
                Object.keys(caught)
                  .filter((breed: string) => caught[breed])
                  .map((breed: string, index: number) => (
                    <div className="breed-card" key={index}>
                      <Card breed={breed} onRemove={removeBreed} />
                    </div>
                  ))
                )
          }
        </div>
      </div>
    </StyledApp>
  );
}

export default App;
