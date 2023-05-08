import React from 'react';

const MOVIEINFODATA = [
  {
    id: 1,
    release: '2023-04-12',
    director: 'Charles F. Stahelski',
    mainActor: 'Keanu Reeves',
    runningTime: '169 minutes',
    des: '죽을 위기에서 살아난 ‘존 윅’은 ‘최고 회의’를 쓰러트릴 방법을 찾아낸다. 비로소 완전한 자유의 희망을 보지만, NEW 빌런 ‘그라몽 후작’과 전 세계의 최강 연합은 ‘존 윅’의 오랜 친구까지 적으로 만들어 버리고, 새로운 위기에 놓인 ‘존 윅’은 최후의 반격을 준비하는데,, 레전드 액션 블록버스터 <존 윅>의 새로운 챕터가 열린다!',
  },
];

export default function MovieInfo() {
  return (
    <div className="mt-52 flex justify-around p-5 bg-mkDarkGray">
      <div className=" w-full h-96 shadow-xl  border-2 border-solid border-black">
        <video
          src="https://www.youtube.com/watch?v=_RnF_9XHz9w"
          className="w-full h-full"
        />
      </div>
      <ul className="px-10 pt-14 text-lg text-mkLightGray">
        {MOVIEINFODATA.map(info => {
          const { release, director, mainActor, runningTime, des } = info;

          return (
            <div key={info.id}>
              <li className="mb-2">개봉 : {release}</li>
              <li className="mb-2">감독 : {director}</li>
              <li className="mb-2">주연 : {mainActor}</li>
              <li className="mb-2">러닝타임 : {runningTime}</li>
              <li>소개 : {des}</li>
            </div>
          );
        })}
      </ul>
    </div>
  );
}
