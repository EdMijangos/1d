'use client';

import Button from "@/components/Button";
import RepoResultCard from "@/components/RepoResultCard";
import Loader from "@/components/Loader";
import { searchRepo, SearchResponse } from "@/services/github-service";
import React, { useEffect, useState } from 'react';
import { useInView } from "react-intersection-observer";
import { useRouter } from 'next/navigation'

export default function Home() {
  const [input, setInput] = useState('');
  const [keyword, setKeyword] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [results, setResults] = useState<SearchResponse[]>([]);
  const [hasResults, setHasResults] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const {ref, inView} = useInView();

  const router = useRouter();
 
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
      const hasResults = res.items?.length > 0
      setHasResults(hasResults);
      setResults(res.items);
      window.sessionStorage.setItem('searchResults', hasResults ? JSON.stringify(res.items) : ""); //キャッシュ
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function getNextPage() {
    setIsLoading(true);
    try {
      const res = await searchRepo(keyword, currentPage + 1);
      const newResults = [...results, ...res?.items]
      setResults(newResults);
      window.sessionStorage.setItem('searchResults', JSON.stringify(newResults)); //キャッシュ
      setCurrentPage(currentPage + 1);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  function handleKeyPress(e:React.KeyboardEvent) {
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
            className="rounded-md bg-white text-black p-2 flex-grow" 
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
                onClick={() => router.push('details/' + item.id)}
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
