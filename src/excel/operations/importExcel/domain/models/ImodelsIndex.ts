export type TExcelData = {
  ettCode: string;
  name: string;
  group: number;
  department: number;
  date: number;
};

export type TFileChangeEvent = {
  target: {
    files: File[];
  };
};
