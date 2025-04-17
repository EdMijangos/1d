'use client';

import Image from "next/image";
import { useParams } from 'next/navigation'
import { useEffect, useState } from "react";
import { SearchResponse, getRepo } from "@/services/github-service";
import Loader from "@/components/Loader";

export default function Details() {
  const {id} = useParams<{ id: string }>()
  const [data, setData] = useState<SearchResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fallbackImage = '/next.svg';
  const countersRenderDic: {title: string, prop: keyof SearchResponse}[] = [
    {title: 'Star数', prop: 'stargazers_count'},
    {title: 'Watcher数', prop: 'watchers_count'},
    {title: 'Fork数', prop: 'forks_count'},
    {title: 'Issue数', prop: 'open_issues_count'},
  ]

  async function getData() {
    setIsLoading(true);
    let cachedData;
    // まずはキャッシュからデータを取得
    const dataCache = window.sessionStorage.getItem('searchResults');
    if (dataCache) {
      cachedData = JSON.parse(dataCache).find((x:SearchResponse) => x.id === parseInt(id))
    }
    // キャッシュがないなら、それともキャッシュにIDを見つからないの場合、APIを呼び出す
    if (!dataCache || !cachedData) {
      cachedData = await getRepo(id);
    }
    setData(cachedData);
    setIsLoading(false);
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className="items-center justify-items-center p-20">
      <div className="w-2/3">
        {data && (
          <div>
            {/* 上部 */}
            <div className="flex gap-8 mb-10">
              <Image
                src={data.owner?.avatar_url?.trim() ? data.owner.avatar_url : fallbackImage}
                width={100}
                height={100}
                alt="ユーザーのアイコン"
                className="rounded-full"
              />
              <div className="p-5">
                <p className="mb-5">{data.name ?? ""}</p>
                <p>{data.language ?? ""}</p>
              </div>
            </div>
            {/* 下部 */}
            <div className="flex justify-between">
              {countersRenderDic.map((item, index) => {
                return (
                  <div className="p-5" key={index + item.title}>
                    <p className="mb-5">{item.title}</p>
                    <p>{item.prop !== "owner" && (data[item.prop] ?? "")}</p>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {!data && !isLoading && (
          <p className="text-white font-bold text-center">リポジトリのデータを取得できませんでした。</p>
        )}

        {/* ローディング中 */}
        {!data && isLoading && <Loader/>}
      </div>
    </div>
  );
}
