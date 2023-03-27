const formatContact = ({ emailAddress, telNumber }) =>
  [emailAddress, telNumber].filter(Boolean).join('\n');

const ContactPanel = ({ contact, onEdit }) => {
  return (
    <div className="mt-4">
      <div style={{ whiteSpace: 'pre-wrap' }}>{formatContact(contact)}</div>
      <button
        type="button"
        onClick={onEdit}
        className="mt-4 inline-flex items-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-800 focus:ring-offset-2"
      >
        Edit Contact Data
      </button>
    </div>
  );
};

export default ContactPanel;
