export function displayCreatedAt(created_at: string) {
  const milliSeconds: number =
    new Date().getTime() - new Date(created_at).getTime();
  const seconds = milliSeconds / 1000;
  if (seconds < 60) return `방금 전`;
  const minutes = seconds / 60;
  if (minutes < 60) return `${Math.floor(minutes)}분 전`;
  const hours = minutes / 60;
  if (hours < 24) {
    return `${Math.floor(hours)}시간 전`;
  } else {
    return (
      <span>
        {created_at.split('T')[0]}&nbsp;&nbsp;
        {created_at.split('T')[1].split(':')[0]}:
        {created_at.split('T')[1].split(':')[1]}
      </span>
    );
  }
}

export function blogCreatedAt(created_at: string) {
  // ** created_at UTC 날짜 가공하여, 며칠 전인지 구하는 로직
  // 1. created_at 날짜를 new Date 객체로 변환 (한국표준시로 자동변경됨)
  // 2. 지금 날짜와 created_at의 날짜의 오차를 구해서, date만 구해야 함
  const dateString = created_at;
  const utcToKst = new Date(dateString);
  const createdY = utcToKst.getFullYear();
  const createdM = utcToKst.getMonth();
  const createdD = utcToKst.getDate();

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const date = now.getDate();

  const createdDate = new Date(createdY, createdM, createdD);
  const nowDate = new Date(year, month, date);

  const cd_nd = nowDate.getTime() - createdDate.getTime(); // 오차구하기
  const blogDate = cd_nd / (1000 * 60 * 60 * 24); // 밀리초로 나눔

  return blogDate;
}
