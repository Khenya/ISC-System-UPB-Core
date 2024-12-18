const generateWelcomeEmail = (name: string) => {
  return {
    subject: 'Bienvenido a Nuestro Servicio',
    text: `Hola ${name},\n\nGracias por registrarte en nuestro servicio.`,
    html: `<p>Hola <strong>${name}</strong>,</p><p>Gracias por registrarte en nuestro servicio.</p>`,
  };
};

module.exports = { generateWelcomeEmail };
