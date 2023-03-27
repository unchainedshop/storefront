const formatAddress = ({
  firstName,
  lastName,
  addressLine,
  addressLine2,
  postalCode,
  city,
  regionCode,
  countryCode,
}) =>
  [
    [firstName, lastName].filter(Boolean).join(' '),
    addressLine,
    addressLine2,
    [postalCode, city].filter(Boolean).join(' '),
    regionCode,
    countryCode,
  ]
    .filter(Boolean)
    .join('\n');

const AddressPanel = ({ address, onEdit }) => {
  return (
    <div className="mt-4">
      <div style={{ whiteSpace: 'pre-wrap' }}>{formatAddress(address)}</div>
      <button
        type="button"
        onClick={onEdit}
        className="mt-4 inline-flex items-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-800 focus:ring-offset-2"
      >
        Edit Address
      </button>
    </div>
  );
};

export default AddressPanel;
