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
