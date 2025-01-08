import { useFieldArray, useFormContext } from "react-hook-form";
import React, { useCallback } from "react";

const FieldArrayWrapper = ({ name }) => {
  const { control, register } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  function getFieldKey(index) {
    return `fields[${index}]`;
  }

  function renderFields() {
    return fields.map((field, index) => {
      const key = getFieldKey(index);
      return (
        <React.Fragment key={key}>
          <input {...register(`${name}.${index}.value`)} />
          <button type="button" onClick={() => remove(index)}>
            Remove
          </button>
        </React.Fragment>
      );
    });
  }

  const handleAdd = useCallback(() => {
    append({});
  }, [append]);

  return (
    <div>
      {renderFields()}
      <button type="button" onClick={handleAdd}>
        Add Field
      </button>
    </div>
  );
};

export default React.memo(FieldArrayWrapper);
