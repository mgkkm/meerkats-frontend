export function createdAt(created_at: string) {
  const now = new Date();
  const utcToKst = new Date(created_at);

  const milliSeconds: number = now.getTime() - utcToKst.getTime();
  const dayDiffer = milliSeconds / (1000 * 60 * 60 * 24);

  const seconds = milliSeconds / 1000;
  if (seconds < 60) return `방금 전`;
  const minutes = seconds / 60;
  if (minutes < 60) return `${Math.floor(minutes)}분 전`;
  const hours = minutes / 60;
  if (hours < 24) {
    return `${Math.floor(hours)}시간 전`;
  } else if (dayDiffer <= 7) {
    return `${Math.floor(dayDiffer)}일 전`;
  } else {
    return `${created_at.split('T')[0]}  ${
      created_at.split('T')[1].split(':')[0]
    }:${created_at.split('T')[1].split(':')[1]}`;
  }
}
