import Button from "@/components/Button";
import RepoResultCard from "@/components/RepoResultCard";
const test = ["result", "test", "example"]

export default function Home() {
  return (
    <div className="items-center justify-items-center p-20">
      <div className="w-1/2">
        <div className="mb-20 flex gap-4">
          <input className="rounded-md bg-white p-2 flex-grow"/>
          <Button text="検索" />
        </div>
        {test.map((item, index) => {
          return (
            <div className="mb-5" key={index + item}>
              <RepoResultCard
                avatar="https://avatars.githubusercontent.com/u/123456?v=4"
                repoName={item}
              />
            </div>
          )
        })}
      </div>
    </div>
  );
}
