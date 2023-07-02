import { ChangeEvent } from 'react';
import { useRecoilState } from 'recoil';
import { validInputState } from '../../../recoil/PaymentState';

export default function Terms() {
  const [allValid, setAllValid] = useRecoilState(validInputState);

  const today = new Date();
  const day = today.getDate();

  const handleCheckBox = (e: ChangeEvent<HTMLInputElement>) => {
    setAllValid({ ...allValid, autoRenewAgreement: e.target.checked });
  };

  return (
    <div className="mt-14 px-2 flex flex-col items-center">
      <div className="flex">
        <input type="checkbox" className="checkbox" onChange={handleCheckBox} />
        <p className="font-semibold ml-3">
          자동 결제 및 구독 관련 안내 사항에 동의합니다.
        </p>
      </div>
      <p className="text-sm text-mkGray mt-4 px-5 leading-6">
        자동 결제에 동의하면 귀하의 구독은 매월 자동으로 갱신되며 귀하 또는
        당사가 해지할 때까지 요금이 부과됩니다. 부분 환불은 불가합니다. 구독
        해지는 다음 달 결제 날짜가 시작되기 최소 48시간 전에 meerkats@mgkkm.com
        으로 문의하시기 바랍니다. 멤버십 및 결제 정보 변경은 변경일 이후 다음
        구독 기간이 시작될 때 적용됩니다.
      </p>
      <p className="text-sm text-mkGray mt-4 px-5 leading-6">
        멤버십을 결제한 날짜에 매월 자동 결제됩니다. 단, 결제일이 존재하지 않는
        달에는 해당 월의 가장 마지막 날에 결제됩니다. *선택하신 구독 상품이 매월{' '}
        {day}일 결제됩니다.
      </p>
    </div>
  );
}
