const formatDate = (date: string): string => {
  const dateFormatted = new Date(date);
  const day =
    dateFormatted.getDate() > 9
      ? dateFormatted.getDate()
      : `0${dateFormatted.getDate()}`;
  const moth =
    //considera janeiro como 0, entao soma-se por padrao br
    dateFormatted.getMonth() + 1 > 9
      ? dateFormatted.getMonth() + 1
      : `0${dateFormatted.getMonth() + 1}`;
  //logica para adicionar 0 a esquerda da data caso ela seja menor que 9
  //9/7/2020 -> 09/07/2020
  const year = dateFormatted.getFullYear();

  return `${day}/${moth}/${year}`;
};

export default formatDate;
