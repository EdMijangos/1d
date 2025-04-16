'use client';

import Button from "@/components/Button";
import RepoResultCard from "@/components/RepoResultCard";
import Loader from "@/components/Loader";
import { searchRepo, SearchResponse } from "@/services/github-service";
import { useEffect, useState } from 'react';
import { useInView } from "react-intersection-observer";

export default function Home() {
  const [input, setInput] = useState('');
  const [keyword, setKeyword] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [results, setResults] = useState<SearchResponse[]>([]);
  const [hasResults, setHasResults] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const { ref, inView } = useInView()
 
  async function getResults() {
    setIsLoading(true);
    // ページネーションのため、入力した値を別のステートに保存
    setKeyword(input);
    setCurrentPage(1);
    try {
      const res = await searchRepo(input);
      // キーワードなしの場合、画面をクリアする。キーワードなしで検索出来ませんなので。
      if (res === null) {
        setHasResults(true);
        setIsLoading(false);
        return setResults([])
      };
      setHasResults(res.items?.length > 0);
      setResults(res.items);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  async function getNextPage() {
    setIsLoading(true);
    try {
      const res = await searchRepo(keyword, currentPage + 1);
      setResults([...results, ...res?.items])
      setCurrentPage(currentPage + 1);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  function handleKeyPress(e:any) {
    if (e.key === 'Enter') getResults();
  }

  // ページネーション
  useEffect(() => {
    if (!inView) return;
    getNextPage();
  }, [inView])

  return (
    <div className="items-center justify-items-center p-20">
      <div className="w-1/2">
        {/* inputとボタン */}
        <div className="mb-20 flex gap-4">
          <input 
            className="rounded-md bg-white p-2 flex-grow" 
            onChange={val => setInput(val.target.value)}
            onKeyDown={e => handleKeyPress(e)}/>
          <Button text="検索" onClick={() => getResults()}/>
        </div>

        {/* 結果 */}
        {hasResults && results.map((item, index) => {
          return (
            <div className="mb-5" key={index + item.id}>
              <RepoResultCard
                avatar={item.owner.avatar_url}
                repoName={item.name}
              />
              {(index ===  results.length - 1) && <div ref={ref}></div>}
            </div>
          )
        })}
        {!hasResults && !isLoading && (
          <p className="text-white font-bold text-center">検索結果がなし</p>
        )}

        {/* ローディング中 */}
        {isLoading && <Loader/>}
      </div>
    </div>
  );
}
