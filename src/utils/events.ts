declare global {
  interface Window {
    dataLayer: unknown[];
  }
}
export const sendDataToGA = async (credit_sum: number, credit_period: number) => {
  try {
    const now = new Date();
    const date = `${now.getFullYear()}-${
      now.getMonth() + 1
    }-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

    await fetch(
      'https://script.google.com/macros/s/AKfycbz28vT6eusrPSZqIA3VsI8Q98PSigK_I58jfxyZmqgjMGSXSSODn3q1CPPhhmtKzZQ/exec',
      {
        redirect: 'follow',
        method: 'POST',
        body: JSON.stringify({ date, credit_sum, credit_period, exp: '3149', variant: '3149_9' }),
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
      },
    );
  } catch (error) {
    console.error('Error!', error);
  }
};
