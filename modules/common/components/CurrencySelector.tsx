import useChangeCartCurrency from '../hooks/useChangeCartCurrency';
import useSupportedCurrencies from '../utils/useSupportedCurrencies';

const CurrencySelector = ({ onChange, selectedCurrency, className = '' }) => {
  const { currencies } = useSupportedCurrencies();
  const { changeCartCurrency } = useChangeCartCurrency();

  const handleCurrencyChange = async (e) => {
    onChange(e);
    await changeCartCurrency(e.target.value);
  };
  return (currencies || []).length > 1 ? (
    <select
      className={`m-3 rounded border-slate-300 py-1 dark:bg-slate-600 dark:text-slate-100 ${className}`}
      onChange={handleCurrencyChange}
      value={selectedCurrency}
      key={selectedCurrency}
    >
      {currencies.map((currency) => (
        <option key={currency?._id} value={currency?.isoCode}>
          {currency?.isoCode}
        </option>
      ))}
    </select>
  ) : null;
};

export default CurrencySelector;
