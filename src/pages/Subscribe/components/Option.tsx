import { useRecoilValue } from 'recoil';
import { warningAlert } from '../../../components/Alert/Modal';
import { currencyFormat } from '../../../components/CurrencyFormat/CurrencyFormat';
import { membershipState } from '../../../recoil/MembershipState';
import { subscribedMembershipIdState } from '../../../recoil/PaymentState';

type subscribeProps = {
  currentType: number;
  changeType(id: number): void;
};

export default function Option({ currentType, changeType }: subscribeProps) {
  const membershipData = useRecoilValue(membershipState);
  const subscribedMembershipId = useRecoilValue(subscribedMembershipIdState);

  const changeMembershipType = (id: number) => {
    if (subscribedMembershipId === null) {
      changeType(id);
    } else {
      changeType(id);
      if (subscribedMembershipId !== id) {
        warningAlert(
          '멤버십 변경',
          `현재 ${
            membershipData[subscribedMembershipId - 1].name
          } 멤버십 구독 중입니다. 멤버십 변경을 원하시면 아래 결제 정보를 확인하신 후, 구독 버튼을 클릭하세요.`
        );
      } else {
        warningAlert(
          '결제 수단 변경',
          '결제 수단 변경을 원하시면 결제 정보를 수정하신 후, 구독 버튼을 클릭하세요.'
        );
      }
    }
  };

  return (
    <div>
      <p className="text-xl font-semibold py-5">|&nbsp; 멤버십 선택</p>
      {membershipData.map(({ id, name, price, ticketProvision }) => {
        return (
          <div className="form-control" key={id}>
            <label
              className="label cursor-pointer sm:w-[28rem] max-sm:block"
              onClick={() => changeMembershipType(id)}
            >
              <div className="flex items-center">
                <input
                  type="radio"
                  name="radio-10"
                  className="radio checked:bg-mkOrange hover:border-mkOrange mr-7"
                  defaultChecked={currentType === id ? true : false}
                />
                <div>
                  <p className="font-semibold">{name}</p>
                  <p className="text-sm">{`월 ${ticketProvision}회 무료 영화 티켓 제공${
                    id === 3 ? ' and MORE!' : ''
                  }`}</p>
                </div>
              </div>
              <span className="ml-[3.25rem] font-semibold max-sm:mt-3">
                {currencyFormat(price)} / 월
              </span>
            </label>
          </div>
        );
      })}
    </div>
  );
}
