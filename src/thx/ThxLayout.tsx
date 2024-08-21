import { Gap } from '@alfalab/core-components/gap';
import { Typography } from '@alfalab/core-components/typography';
import party from '../assets/party.png';
import { thxSt } from './style.css';

export const ThxLayout = () => {
  return (
    <>
      <div className={thxSt.container}>
        <img src={party} width={120} className={thxSt.rocket} />
        <Typography.TitleResponsive font="system" tag="h1" view="large" defaultMargins weight="medium">
          Спасибо, мы записали ваш ответ
        </Typography.TitleResponsive>
        <Typography.TitleResponsive font="system" tag="h2" view="xsmall" weight="medium">
          Сервис находится в разработке. Как только он будет доступен, мы обязательно вам сообщим.
        </Typography.TitleResponsive>
      </div>
      <Gap size={128} />
    </>
  );
};
