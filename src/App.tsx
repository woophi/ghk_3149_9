import { ButtonMobile } from '@alfalab/core-components/button/mobile';
import { CDNIcon } from '@alfalab/core-components/cdn-icon';
import { Gap } from '@alfalab/core-components/gap';
import { SliderInput, SliderInputProps } from '@alfalab/core-components/slider-input';
import { Typography } from '@alfalab/core-components/typography';
import { useCallback, useState } from 'react';
import { LS, LSKeys } from './ls';
import { appSt } from './style.css';
import { ThxLayout } from './thx/ThxLayout';
import { sendDataToGA } from './utils/events';

const min = 10_000;
const max = 200_000;
const step = 1;
const range: SliderInputProps['range'] = {
  min: [min],
  max: [max],
};
const pips: SliderInputProps['pips'] = {
  mode: 'values',
  values: [min, max],
  format: {
    to: (value: number) => {
      return `${value.toLocaleString('ru')} ₽`;
    },
  },
};

const pipsValuesPeriod = [1, 3, 6, 9, 12];

function findNearestValue(arr: number[], target: number) {
  return arr.reduce((prev, curr) => (Math.abs(curr - target) < Math.abs(prev - target) ? curr : prev));
}

function calculatePayment(principal: number, interestRate: number, term: number) {
  const monthlyInterestRate = interestRate / 12;
  const exponent = Math.pow(1 + monthlyInterestRate, term);

  return Math.ceil((principal * monthlyInterestRate * exponent) / (exponent - 1));
}

export const App = () => {
  const [value, setValue] = useState<number | string>(20_000);
  const [periodValue, setPeriodValue] = useState<number>(3);

  const [loading, setLoading] = useState(false);
  const [thxShow, setThx] = useState(LS.getItem(LSKeys.ShowThx, false));

  const numberValue = typeof value === 'string' ? Number(value.replace(/\s+/g, '')) : value;
  const monthlyRate = numberValue > 29_999 ? 0.3999 : 0.598;
  const monthlyPayment = calculatePayment(numberValue, monthlyRate, periodValue);
  const totalOverpay = (monthlyPayment * periodValue - numberValue) / periodValue;

  const handleInputChange: SliderInputProps['onInputChange'] = (_, { value }) => {
    setValue(typeof value === 'string' ? Number(value.replace(/\s+/g, '')) : value);
  };

  const handleSliderChange: SliderInputProps['onSliderChange'] = ({ value }) => {
    setValue(value);
  };
  const handleBlur = () => {
    setValue(Math.max(min, Math.min(max, numberValue)));
  };

  const handlePInputChange: SliderInputProps['onInputChange'] = (_, { value }) => {
    setPeriodValue(value === '' ? 1 : value);
  };

  const handlePSliderChange: SliderInputProps['onSliderChange'] = ({ value }) => {
    setPeriodValue(findNearestValue(pipsValuesPeriod, value));
  };

  const handlePBlur = () => {
    setPeriodValue(
      findNearestValue(
        pipsValuesPeriod,
        Math.max(pipsValuesPeriod[0], Math.min(pipsValuesPeriod[pipsValuesPeriod.length - 1], periodValue)),
      ),
    );
  };

  const submit = useCallback(() => {
    setLoading(true);
    sendDataToGA(numberValue, periodValue).then(() => {
      LS.setItem(LSKeys.ShowThx, true);
      setThx(true);
      setLoading(false);
    });
  }, [numberValue, periodValue]);

  if (thxShow) {
    return <ThxLayout />;
  }

  return (
    <>
      <div className={appSt.container}>
        <Typography.TitleResponsive tag="h1" view="large" font="system" weight="bold">
          Вам одобрен кредит наличными
        </Typography.TitleResponsive>
        <Gap size={16} />

        <SliderInput
          block
          value={value.toLocaleString('ru')}
          sliderValue={numberValue}
          onInputChange={handleInputChange}
          onSliderChange={handleSliderChange}
          onBlur={handleBlur}
          min={min}
          max={max}
          range={range}
          pips={pips}
          step={step}
          size={56}
          rightAddons="₽"
          fieldClassName={appSt.slider}
          sliderClassName={appSt.slid}
        />
        <SliderInput
          block
          value={periodValue}
          sliderValue={periodValue}
          onInputChange={handlePInputChange}
          onSliderChange={handlePSliderChange}
          onBlur={handlePBlur}
          min={pipsValuesPeriod[0]}
          max={pipsValuesPeriod[pipsValuesPeriod.length - 1]}
          step={3}
          pips={{
            mode: 'steps',
            values: pipsValuesPeriod,
            format: {
              to: (v: number) => {
                return `${v === 1 || v === 12 ? v : v - 1}  `;
              },
            },
          }}
          size={56}
          rightAddons={periodValue === 1 ? 'месяц' : periodValue >= 5 ? 'месяцев' : 'месяца'}
          fieldClassName={appSt.slider}
          sliderClassName={appSt.slid}
        />

        <div className={appSt.box}>
          <Typography.Text view="primary-medium" weight="bold">
            {Number(totalOverpay.toFixed(2)).toLocaleString('ru')} ₽
          </Typography.Text>

          <Typography.Text view="primary-small">Сумма переплаты в месяц</Typography.Text>
        </div>
      </div>
      <div className={appSt.bottomBtn}>
        <ButtonMobile block view="primary" className={appSt.btn} onClick={submit} loading={loading}>
          <div className={appSt.btnContainer}>
            <div>
              <Typography.TitleResponsive font="system" tag="h2" view="xsmall" weight="bold">
                {calculatePayment(numberValue, monthlyRate, periodValue).toLocaleString('ru')} ₽
              </Typography.TitleResponsive>
              <Typography.Text style={{ color: '#A1A1A1' }} tag="p" view="primary-medium" defaultMargins={false}>
                Платеж в месяц
              </Typography.Text>
            </div>

            <div className={appSt.btnContainer}>
              <CDNIcon name="glyph_chevron-right_m" />
            </div>
          </div>
        </ButtonMobile>
      </div>
    </>
  );
};
