import jwt_decode from 'jwt-decode';

interface DecodedToken {
  id: number;
  nickname?: string;
}

export const DecodeToken = (
  setCurrentId: Function,
  setCurrentNickname: Function
) => {
  const token = sessionStorage.getItem('token');

  if (token) {
    const decodedToken: DecodedToken = jwt_decode(token);
    const tokenId = decodedToken.id;
    const tokenNickname = decodedToken.nickname;
    setCurrentId(tokenId);
    setCurrentNickname(tokenNickname);
  }
};
