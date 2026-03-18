import { HeroList } from "../components/HeroList";

export const MarvelPage = () => {
  return (
    <>
      <h1 className="text-center p-2">Marvel Comics</h1>
      <hr />
      <HeroList publisher={"Marvel Comics"} />
    </>
  );
}
