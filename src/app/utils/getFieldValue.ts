export const getFieldValue = (fields: any[], fieldName: any) => {
  return fields?.find(
    (field: { fieldId: { name: any } }) => field?.fieldId.name === fieldName
  )?.value;
};

export const getFieldId = (fields: any[], fieldName: string) => {
  const field = fields?.find(
    (field: { fieldId: { name: string } }) => field.fieldId.name === fieldName
  );
  return field ? field.fieldId._id : null;
};
