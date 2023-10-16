const getCellValue = (
  excelRow: { [x: string]: string | number },
  key: string
) => {
  const isElement = Object.keys(excelRow).find((i) => i.includes(key));
  if (isElement) return excelRow[isElement];
};

export const adaptSerialNumToJSDate = (serialNumber: number) => {
  const utcDays = Math.floor(serialNumber - 25569);
  const utcValue = utcDays * 86400;
  const dateInfo = new Date(utcValue * 1000);

  const fractionalDay = serialNumber - Math.floor(serialNumber) + 0.0000001;

  let totalSeconds = Math.floor(86400 * fractionalDay);

  const seconds = totalSeconds % 60;

  totalSeconds -= seconds;

  const hours = Math.floor(totalSeconds / (60 * 60));
  const minutes = Math.floor(totalSeconds / 60) % 60;

  const fullDate = new Date(
    dateInfo.getFullYear(),
    dateInfo.getMonth(),
    dateInfo.getDate(),
    hours,
    minutes,
    seconds
  );
  return fullDate;
};

export const adaptExcelRowValues = (excelRow: {
  [x: string]: string | number;
}) => {
  if (excelRow) {
    const data = {
      id: getCellValue(excelRow, "IDENTIFICADOR"),
      name: getCellValue(excelRow, "NOMBRE SUSTITUTO"),
      group: getCellValue(excelRow, "GRUPO"),
      department: getCellValue(excelRow, "DEP"),
      date: getCellValue(excelRow, "FECHA"),
    };
    return data;
  }
};
