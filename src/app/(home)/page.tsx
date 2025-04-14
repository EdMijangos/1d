'use client';

import Button from "@/components/Button";
import RepoResultCard from "@/components/RepoResultCard";
import Loader from "@/components/Loader";
import { searchRepo, SearchResponse } from "@/services/github-service";
import { useState } from 'react';

export default function Home() {
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState<SearchResponse[]>([]);
  const [hasResults, setHasResults] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
 
  async function getResults() {
    setIsLoading(true);
    const res = await searchRepo(keyword);
    if (res === null) {
      setHasResults(true);
      setIsLoading(false);
      return setResults([])
    };
    setHasResults(res.items.length > 0);
    setResults(res.items);
    setIsLoading(false);
  }

  function handleKeyPress(e:any) {
    if (e.key === 'Enter') getResults();
  }

  return (
    <div className="items-center justify-items-center p-20">
      <div className="w-1/2">
        {/* inputとボタン */}
        <div className="mb-20 flex gap-4">
          <input 
            className="rounded-md bg-white p-2 flex-grow" 
            onChange={val => setKeyword(val.target.value)}
            onKeyDown={e => handleKeyPress(e)}/>
          <Button text="検索" onClick={() => getResults()}/>
        </div>
        
        {/* 結果 */}
        {hasResults && results.map((item, index) => {
          return (
            <div className="mb-5" key={index}>
              <RepoResultCard
                avatar={item.owner.avatar_url}
                repoName={item.name}
              />
            </div>
          )
        })}
        {!hasResults && (
          <p className="text-white font-bold text-center">検索結果がなし</p>
        )}

        {/* ローディング中 */}
        {isLoading && <Loader/>}
      </div>
    </div>
  );
}
