type questionParams = {
  title: string;
  img: string;
  correctAnswerIndex: number;
  answers: { text: string | undefined; img: string | undefined }[];
};
