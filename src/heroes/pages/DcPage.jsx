import { HeroList } from "../components/HeroList"



export const DcPage = () => {
  return (
    <>
      <h1 className="text-center p-2">DC Comics</h1>
      <hr />
      <HeroList publisher={'DC Comics'} />
    </>
  )
}
