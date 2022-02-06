const getEmailConfirmationHtmlTemplate = (code: number) => {
  return `
    <p>Your code is: ${code}</p>
  `;
};

export { getEmailConfirmationHtmlTemplate };
