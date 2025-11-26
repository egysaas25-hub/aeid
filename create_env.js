const fs = require('fs');
const content = 'DATABASE_URL="postgresql://ecommerce:ecommerce_password@localhost:5432/ecommerce?schema=public"\nNEXTAUTH_SECRET="your-super-secret-key-change-this-in-production"\nNEXTAUTH_URL="http://localhost:3000"';
fs.writeFileSync('.env', content, { encoding: 'utf8' });
console.log('.env created');
