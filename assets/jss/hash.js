const bcrypt = require('bcryptjs'); // Certifique-se de que esta linha está presente

const senha = '1234';
bcrypt.hash(senha, 10, (err, hash) => {
    if (err) throw err;
    console.log("Hash da senha '1234':", hash);
});
